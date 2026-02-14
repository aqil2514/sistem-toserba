import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PasetoService } from '../auth/paseto.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ActivityGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly paseto: PasetoService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    const auth = client.handshake.auth;

    if (!auth?.token) throw new UnauthorizedException('Token tidak ditemukan');

    try {
      const payload = await this.paseto.verify(auth.token);
      if (payload.role !== 'admin') {
        throw new UnauthorizedException('Akses tidak diizinkan');
      }
    } catch (err) {
      console.error('Token invalid:', err.message);
      throw new UnauthorizedException('Token invalid');
    }
    console.log('Client Connected', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client Disconnect', client.id);
  }

  emitActivity(activity: any) {
    console.log('Masuk ke emit');
    this.server.emit('activity:new', activity);
  }

  @SubscribeMessage('event')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    console.log(data);
    const event = 'event';
    return {
      data,
      event,
    };
  }
}

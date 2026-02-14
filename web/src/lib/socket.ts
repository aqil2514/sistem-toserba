import { SERVER_URL } from "@/constants/url";
import { io, Socket } from "socket.io-client";
let socket: Socket;

export function getSocket(token: string) {
  if (!socket) {
    socket = io(SERVER_URL, {
      transports: ["websocket"],
      auth: { token },
    });
  }

  return socket;
}

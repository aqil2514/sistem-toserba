import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

export function usePusher<T = unknown>(
  channelName: string,
  eventName: string,
  callback: (data: T) => void,
) {
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    if (!pusherRef.current) {
      pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });
    }

    const channel = pusherRef.current.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      channel.unbind(eventName, callback);
      pusherRef.current?.unsubscribe(channelName);
    };
  }, [channelName, eventName, callback]);
}

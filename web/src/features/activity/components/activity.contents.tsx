"use client";
import { MainContainer } from "@/components/layout/container/main-container";
import { SectionContainer } from "@/components/layout/container/section-container";
import { fetcherAxios } from "@/lib/fetcher";
import { getSocket } from "@/lib/socket";
import { useEffect } from "react";
import useSWR from "swr";

export function ActivityContents() {
  const { data } = useSWR<{ token: string }>("/api/auth/token", fetcherAxios);

  useEffect(() => {
    if (!data) return;
    const socket = getSocket(data.token);
    socket.on("connect", () => {
        console.log("Test websocket")
    });
  }, [data]);
  return (
    <MainContainer>
      <SectionContainer>OK</SectionContainer>
    </MainContainer>
  );
}

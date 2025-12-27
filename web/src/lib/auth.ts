import { AuthUser } from "@/@types/auth";
import { headers } from "next/headers";

export async function getMe(): Promise<AuthUser | null> {
  try {
    const headerStore = await headers();
    const cookieHeader = headerStore.get("cookie") ?? "";

    const res = await fetch("http://localhost:3001/auth/me", {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

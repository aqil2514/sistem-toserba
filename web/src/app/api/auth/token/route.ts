import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("auth_token");
  if (!token)
    return NextResponse.json({ message: "Akses ditolak" }, { status: 401 });

  return NextResponse.json({ token:token.value });
}

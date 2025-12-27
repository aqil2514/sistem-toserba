"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useToastHome } from "../hooks/use-toast-home";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

export function LoginCard() {
  useToastHome();
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Login Admin</CardTitle>
        <CardDescription>Akses sistem operasional warung</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <a href={`${BACKEND_URL}/auth/google`} className="block">
          <Button className="w-full gap-2" size="lg">
            <Chrome className="w-4 h-4" />
            Login dengan Google
          </Button>
        </a>

        <p className="text-xs text-muted-foreground text-center">
          Hanya email yang terdaftar yang dapat mengakses sistem ini.
        </p>
      </CardContent>
    </Card>
  );
}

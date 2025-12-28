"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Eye } from "lucide-react";
import Link from "next/link";
import { useToastHome } from "../hooks/use-toast-home";
import { SERVER_URL } from "@/constants/url";

export function LoginCard() {
  useToastHome();

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">Login Admin</CardTitle>
        <CardDescription>Akses sistem operasional warung</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* LOGIN GOOGLE */}
        <a href={`${SERVER_URL}/auth/google`} className="block">
          <Button className="w-full gap-2" size="lg">
            <Chrome className="h-4 w-4" />
            Login dengan Google
          </Button>
        </a>

        {/* DEMO MODE */}
        <Link href="/demo/dashboard" className="block">
          <Button variant="outline" className="w-full gap-2" size="lg">
            <Eye className="h-4 w-4" />
            Coba Demo
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground text-center">
          Login hanya untuk admin terdaftar. <br />
          Mode demo tidak menyimpan data ke server.
        </p>
      </CardContent>
    </Card>
  );
}

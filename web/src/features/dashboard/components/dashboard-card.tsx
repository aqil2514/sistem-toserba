"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToastDashboard } from "../hooks/use-toast-dashboard";
import { SERVER_URL } from "@/constants/url";

export function DashboardCard() {
  useToastDashboard();
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Dashboard</CardTitle>
        <CardDescription>Sistem Operasional Warung</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form action={`${SERVER_URL}/auth/logout`} method="post">
          <Button variant="destructive" className="w-full gap-2" size="lg">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Anda akan keluar dari sesi admin.
        </p>
      </CardContent>
    </Card>
  );
}

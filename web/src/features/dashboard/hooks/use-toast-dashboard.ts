import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LOGIN_TOAST_KEY = "show-login-toast";

export function useToastDashboard() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("login") === "success") {
      sessionStorage.setItem(LOGIN_TOAST_KEY, "1");
      router.replace("/dashboard");
      return;
    }

    if (sessionStorage.getItem(LOGIN_TOAST_KEY)) {
      toast.success("Login berhasil. Selamat datang 👋");
      sessionStorage.removeItem(LOGIN_TOAST_KEY);
    }
  }, [params, router]);
}

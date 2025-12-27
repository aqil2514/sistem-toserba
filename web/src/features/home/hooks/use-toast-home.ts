import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const UNAUTHORIZED_TOAST_KEY = "show-unauthorized-toast";
const LOGOUT_TOAST_KEY = "show-logout-toast";

export function useToastHome() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // 1️⃣ Tangkap error unauthorized
    if (params.get("error") === "unauthorized") {
      sessionStorage.setItem(UNAUTHORIZED_TOAST_KEY, "1");
      router.replace("/");
      return;
    }

    // 2️⃣ Tangkap logout success
    if (params.get("logout") === "success") {
      sessionStorage.setItem(LOGOUT_TOAST_KEY, "1");
      router.replace("/");
      return;
    }

    // 3️⃣ Tampilkan toast unauthorized
    if (sessionStorage.getItem(UNAUTHORIZED_TOAST_KEY)) {
      toast.error("Akses ditolak");
      sessionStorage.removeItem(UNAUTHORIZED_TOAST_KEY);
    }

    // 4️⃣ Tampilkan toast logout
    if (sessionStorage.getItem(LOGOUT_TOAST_KEY)) {
      toast.success("Berhasil logout 👋");
      sessionStorage.removeItem(LOGOUT_TOAST_KEY);
    }
  }, [params, router]);
}

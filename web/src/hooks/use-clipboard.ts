import { toast } from "sonner";

interface CopyOptions {
  successMessage?: string;
  errorMessage?: string;
}

export function useClipboard() {
  const copy = async (
    text: string,
    options?: CopyOptions
  ): Promise<boolean> => {
    if (!text) {
      toast.error("Tidak ada teks untuk disalin");
      return false;
    }

    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API tidak tersedia");
      }

      await navigator.clipboard.writeText(text);

      toast.success(
        options?.successMessage ?? "Berhasil disalin ke clipboard"
      );

      return true;
    } catch (error) {
      console.error("Clipboard error:", error);

      toast.error(
        options?.errorMessage ??
          "Gagal menyalin teks. Silakan salin manual."
      );

      return false;
    }
  };

  return { copy };
}

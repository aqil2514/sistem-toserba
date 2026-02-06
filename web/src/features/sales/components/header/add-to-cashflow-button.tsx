import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BanknoteArrowUp } from "lucide-react";
import { useState } from "react";

interface Props {
  onClickButton: () => void | Promise<void>;
}

export function AddToCashflowButton({ onClickButton }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clickHandler = async () => {
    try {
      setIsLoading(true);
      await onClickButton();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      variant={"outline"}
      size={"icon"}
      title="Tambah atau Update Cashflow"
      onClick={clickHandler}
    >
      {isLoading ? <Spinner /> : <BanknoteArrowUp />}
    </Button>
  );
}

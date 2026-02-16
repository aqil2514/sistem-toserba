import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileX } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  onClickButton?: () => void;
  buttonLabel?: string;
}

export function EmptyData({
  description = "Data yang dimaksud tidak dapat ditemukan.",
  onClickButton,
  buttonLabel,
  title = "Data tidak ditemukan",
}: Props) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileX />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {buttonLabel && onClickButton && (
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={onClickButton}>
            {buttonLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}

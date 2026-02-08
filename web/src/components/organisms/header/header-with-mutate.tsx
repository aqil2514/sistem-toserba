import { MutateButton } from "@/components/ui/mutate-button";
import { KeyedMutator } from "swr";

interface Props<T> {
  mutate?: KeyedMutator<T>;
  successToastMessage?: string;
  title: string;
}

export function HeaderWithMutate<T>({
  title,
  mutate,
  successToastMessage,
}: Props<T>) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">{title}</h1>

        <div className="flex gap-4">
          <MutateButton
            mutate={mutate}
            successToastMessage={successToastMessage}
          />
        </div>
      </div>
    </div>
  );
}

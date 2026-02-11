import { KeyedMutator } from "swr";
import { CashDenomination } from "../types/types.cash-counter-denomination";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";

interface DenominationContextTypes {
  data: CashDenomination[] | undefined;
  error: Error;
  isLoading: boolean;
  mutate: KeyedMutator<CashDenomination[]>;

  // CRUD
  addDialog: boolean;
  setAddDialog: Dispatch<SetStateAction<boolean>>;
  editDialog: string | null;
  setEditDialog: Dispatch<SetStateAction<string | null>>;
  deleteDialog: string | null;
  setDeleteDialog: Dispatch<SetStateAction<string | null>>;
}

const DenominationContext = createContext<DenominationContextTypes>(
  {} as DenominationContextTypes,
);

export function DenominationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [editDialog, setEditDialog] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  const fetcher = useFetch<CashDenomination[]>(
    `${SERVER_URL}/cash-counter/denomination`,
  );

  const values: DenominationContextTypes = {
    ...fetcher,

    addDialog,
    setAddDialog,
    editDialog,
    setEditDialog,
    deleteDialog,
    setDeleteDialog,
  };

  return (
    <DenominationContext.Provider value={values}>
      {children}
    </DenominationContext.Provider>
  );
}

export const useDenomination = () => useContext(DenominationContext);

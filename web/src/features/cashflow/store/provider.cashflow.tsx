"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface CashflowContextType {
  addDialog: boolean;
  setAddDialog: Dispatch<SetStateAction<boolean>>;
}

const CashflowContext = createContext<CashflowContextType>(
  {} as CashflowContextType,
);

export function CashflowProvider({ children }: { children: React.ReactNode }) {
  const [addDialog, setAddDialog] = useState<boolean>(false);

  const values: CashflowContextType = {
    addDialog,
    setAddDialog,
  };
  return (
    <CashflowContext.Provider value={values}>
      {children}
    </CashflowContext.Provider>
  );
}

export const useCashflow = () => useContext(CashflowContext);

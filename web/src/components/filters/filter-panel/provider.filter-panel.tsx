import { FilterState } from "@/@types/general";
import { FilterConfig } from "./types.filter-panel";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

interface FilterPanelContextType {
  config: FilterConfig[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;

  snapshot: FilterState[];
  setSnapshot: Dispatch<SetStateAction<FilterState[]>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterPanelContextType>(
  {} as FilterPanelContextType,
);

interface FilterPanelProviderProps {
  config: FilterConfig[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
  children: React.ReactNode;
}

export function FilterPanelProvider({
  children,
  config,
  initialValue,
  onApplyFilter,
}: FilterPanelProviderProps) {
  const [snapshot, setSnapshot] = useState<FilterState[]>(initialValue);
  const [open, setOpen] = useState<boolean>(false);

  const syncInit = useEffectEvent(() => {
    setSnapshot(initialValue);
  });

  useEffect(() => {
    if (open) {
      syncInit();
    }
  }, [open]);

  const values: FilterPanelContextType = {
    config,
    initialValue,
    onApplyFilter,

    open,
    setOpen,
    setSnapshot,
    snapshot,
  };

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
}

export const useFilterPanel = () => useContext(FilterContext);

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FloatingPopoverContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  tabsContent: string;
  setTabsContent: Dispatch<SetStateAction<string>>;
}

const FloatingPopoverContext = createContext<FloatingPopoverContextType>(
  {} as FloatingPopoverContextType
);

export function FloatingPopoverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tabsContent, setTabsContent] = useState<string>("sales-summary");

  const values: FloatingPopoverContextType = {
    isOpen,
    setIsOpen,
    setTabsContent,
    tabsContent,
  };

  return (
    <FloatingPopoverContext.Provider value={values}>
      {children}
    </FloatingPopoverContext.Provider>
  );
}

export const useFloatingPopover = () => useContext(FloatingPopoverContext);

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type HoverContextType = {
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

type HoverProviderProps = {
  children: ReactNode;
};

export function HoverProvider({ children }: HoverProviderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);
  if (!context) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
}

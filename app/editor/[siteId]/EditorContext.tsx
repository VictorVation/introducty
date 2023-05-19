"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

type EditorContextType = {
  solid: string;
  gradientId: string;
  backgroundType: string;
  setSolid: React.Dispatch<React.SetStateAction<string>>;
  setGradientId: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundType: React.Dispatch<React.SetStateAction<string>>;
};

const defaultContext = {
  solid: "#f1f5f9",
  setSolid: () => {},
  gradientId: "1",
  setGradientId: () => {},
  backgroundType: "gradient",
  setBackgroundType: () => {},
};
export const EditorContext =
  React.createContext<EditorContextType>(defaultContext);

type EditorContextProviderProps = PropsWithChildren<{
  solid?: string | null;
  gradientId?: string | null;
  backgroundType?: string | null;
}>;

export function EditorContextProvider({
  children,
  solid: initialSolid,
  gradientId: initialGradientId,
  backgroundType: initialBackgroundType,
}: EditorContextProviderProps) {
  const [solid, setSolid] = useState(initialSolid ?? defaultContext.solid);
  const [gradientId, setGradientId] = useState(
    initialGradientId ?? defaultContext.gradientId
  );
  const [backgroundType, setBackgroundType] = useState(
    initialBackgroundType ?? defaultContext.backgroundType
  );
  return (
    <EditorContext.Provider
      value={{
        solid,
        setSolid,
        gradientId,
        setGradientId,
        backgroundType,
        setBackgroundType,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

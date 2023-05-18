"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

type EditorContextType = {
  solid?: string;
  setSolid?: React.Dispatch<React.SetStateAction<string>>;
  gradientId?: number;
  setGradientId?: React.Dispatch<React.SetStateAction<number>>;
  backgroundType?: string;
  setBackgroundType?: React.Dispatch<React.SetStateAction<string>>;
};

export const EditorContext = React.createContext<EditorContextType>({});

export function EditorContextProvider({ children }: PropsWithChildren) {
  const [solid, setSolid] = useState("#ffffff");
  const [gradientId, setGradientId] = useState(0);
  const [backgroundType, setBackgroundType] = useState("gradient");
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

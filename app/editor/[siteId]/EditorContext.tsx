"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

type EditorContextType = {
  backgroundColor?: string;
  setBackgroundColor?: React.Dispatch<React.SetStateAction<string>>;
};
export const EditorContext = React.createContext<EditorContextType>({});

export function EditorContextProvider({ children }: PropsWithChildren) {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  return (
    <EditorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </EditorContext.Provider>
  );
}

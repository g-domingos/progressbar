import { createContext, useState } from "react";

export const Slice = createContext<{ user?: any; setUser?: any }>({});

export const Context = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>({});

  return <Slice.Provider value={{ user, setUser }}>{children}</Slice.Provider>;
};

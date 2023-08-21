import { PropsWithChildren, createContext, useContext } from "react";

interface StoreContextValue {}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw Error("We not be inside the provider");
  }
  return context;
}

export function StoreProvider({ children }: PropsWithChildren<any>) {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
}

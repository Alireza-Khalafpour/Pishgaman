"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [vehicleIdState, setVehicleIdState] = useState<number>(0);
  const [tokenState, setTokenState] = useState<number>(0);

  console.log(tokenState)

  return (
    <AppContext.Provider
      value={{ vehicleIdState, setVehicleIdState, tokenState, setTokenState }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function UseAppContext() {
  return useContext(AppContext);
}

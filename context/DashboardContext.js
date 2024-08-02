import React, { useState, createContext, useMemo } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [dashboardState, setDashboardState] = useState({
    auction: {},
    history: [],
    draft: {},
    paymentData: {},
    creatorData: {},
    creatorId: "",
  });

  const dashboardMemo = useMemo(
    () => [dashboardState, setDashboardState],
    [dashboardState, setDashboardState]
  );

  return (
    <DashboardContext.Provider value={dashboardMemo}>
      {children}
    </DashboardContext.Provider>
  );
};

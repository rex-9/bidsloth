import DashboardLayout from "../hoc/dashboardLayout";
import React, { useState, useEffect, useContext } from "react";
import NewUser from "../parts/payouts/newUser";
import ConnectedUser from "../parts/payouts/connectedUser";
import { DashboardContext } from "../context/DashboardContext";

export default function Payouts() {
  // import context data
  const [dashboardState] = useContext(DashboardContext);
  const { creatorData } = dashboardState;

  const [activeScreen, setActiveScreen] = useState("newUser");

  useEffect(() => {
    // set active screen by stripe state
    if (creatorData?.isStripeConnected) {
      setActiveScreen("connectedUser");
    } else {
      setActiveScreen("newUser");
    }
  }, [creatorData]);

  const handleActiveScreen = () => {
    switch (activeScreen) {
      case "newUser":
        return <NewUser />;
      case "connectedUser":
        return <ConnectedUser />;
      default:
        return <NewUser />;
    }
  };

  return (
    <DashboardLayout pageTitle="Payouts">
      {handleActiveScreen()}
    </DashboardLayout>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";
import Home from "../parts/dashboard";
import Draft from "../parts/dashboard/draft";

export default function DashboardPage() {
  const [dashboardState] = useContext(DashboardContext);
  const { creatorData } = dashboardState;
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    if (creatorData?.auctions) {
      creatorData?.auctions[0]?.isDraft
        ? setActivePage("draft")
        : setActivePage("home");
    }
  }, [creatorData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return activePage === "home" ? <Home /> : <Draft />;
}

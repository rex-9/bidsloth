import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { DashboardContextProvider } from "../context/DashboardContext";
import "../styles/globals.css";

export default function App({ Component, ...pageProps }) {
  return (
    <DashboardContextProvider>
      <GoogleAnalytics trackPageViews />

      <ToastContainer style={{ zIndex: 6000000 }} />
      <Component {...pageProps} />
      <Analytics />
    </DashboardContextProvider>
  );
}

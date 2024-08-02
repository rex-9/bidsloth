import Router from "next/router";

export default function useLogout() {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.replace(`/login?return=${Router.pathname}`);
  }
}

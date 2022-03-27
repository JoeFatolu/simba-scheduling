import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toast";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

export default MyApp;

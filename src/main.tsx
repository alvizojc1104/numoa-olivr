import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";


import App from "./App.tsx";
import Provider from "./provider.tsx";
import "./styles/globals.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/sign-in "}>
          <App />
        </ClerkProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

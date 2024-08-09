import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenProvider } from "./Context/ScreenContext.jsx";
import { CharacterProvider } from "./Context/characterContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ScreenProvider>
        <CharacterProvider>
          <App />
        </CharacterProvider>
      </ScreenProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

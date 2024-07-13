import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenProvider } from "./Context/ScreenContext.jsx";
import { CharacterProvider } from "./Context/characterContext.jsx";
import { UserProvider } from "./Context/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScreenProvider>
      <CharacterProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CharacterProvider>
    </ScreenProvider>
  </React.StrictMode>
);

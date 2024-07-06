import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenProvider } from "./Context/ScreenContext.jsx";
import { CharacterProvider } from "./Context/characterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScreenProvider>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </ScreenProvider>
  </React.StrictMode>
);

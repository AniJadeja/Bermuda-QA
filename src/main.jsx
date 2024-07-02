import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ScreenProvider } from "./Context/ScreenContext.jsx";
import Nipple from "react-nipple";
import { movementCharacter } from "./Components/Character/CharacterControls.jsx";

  const JoyStrikStart = (data) => {
    console.log("data", data);

    if (data && data.direction && data.direction.angle == "up") {
      movementCharacter.z=1
    }

     if (data.direction && data.direction.angle == "right") {
      movementCharacter.x=-1
  }

 if (data.direction && data.direction.angle == "left") {
  movementCharacter.x=1
  }
   if (data.direction && data.direction.angle == "down") {
    movementCharacter.z=-1
   }
  };

  const JoyStrikEnd = (d) => {
    movementCharacter.z=0
    movementCharacter.x=0
  };
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ScreenProvider>
      <App />
      
    </ScreenProvider>
    <Nipple
       options={{ mode: "static", position: { bottom: "50px", left: "50px" } }}
       style={{
           width: 100,
           height: 100,
           position: "absolute",
           bottom: "50px",
           left: "50px",
         }}
         onMove={(evt, data) => {
           if (data && data) {
             JoyStrikStart(data);
          }
         }}
         onEnd={(e, d) => JoyStrikEnd(d)}
       />
  </React.StrictMode>
);

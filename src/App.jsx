// App.jsx

import Scene from "./Components/Scene";
import Nipple from "react-nipple";
import { movementCharacter } from "./Components/Character/CharacterControls.jsx";
import { useCameraControlStore } from "./Components/GlobalData/GlobalData";
import PopupButton from "./Components/Popup/PopupButton";
import { useMobileScreen } from "./Context/ScreenContext.jsx";
import { useCallback } from "react";
import { useCharacterState } from './Context/characterContext.jsx'

function App() {
  const joyStickStart = useCallback((data) => {

    if (data.distance > 0) {
      // Calculate angle in radians
      const angleRad = (data.angle.degree * Math.PI) / 180;

      // Convert angle to movement directions
      movementCharacter.x = -Math.cos(angleRad);
      movementCharacter.z = Math.sin(angleRad);
    }

  }, []);

  const joyStickEnd = (d) => {
    movementCharacter.z = 0;
    movementCharacter.x = 0;
  };

 const isMobileScreen = useMobileScreen();
//  const isMobileScreen = true;
  const {isCharacterControllable, setCharacterControllable } = useCharacterState();

  return (
    <div>
      <PopupButton />
      <Scene />
      {
        console.log("Character controllable : ", isCharacterControllable)
      }
      {isMobileScreen && isCharacterControllable ? (
        <Nipple
          options={{
            mode: "static",
            position: { bottom: "50px", left: "50px" },
          }}
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: "50px",
            left: "50px",
          }}
          onMove={(evt, data) => {
            if (data) {
              joyStickStart(data);
            }
          }}
          onEnd={(e, d) => joyStickEnd(d)}
        />
      ) : null}
    </div>
  );
}

export default App;

import Scene from "./Components/Scene";
import Nipple from "react-nipple";
import { movementCharacter } from "./Components/Character/CharacterControls.jsx";
import { useCameraControlStore } from "./Components/GlobalData/GlobalData";
import PopupButton from "./Components/Popup/PopupButton";

const JoyStrikStart = (data) => {
  console.log("data", data);

  if (data && data.direction && data.direction.angle == "up") {
    movementCharacter.z = 1;
  }

  if (data.direction && data.direction.angle == "right") {
    movementCharacter.x = -1;
  }

  if (data.direction && data.direction.angle == "left") {
    movementCharacter.x = 1;
  }
  if (data.direction && data.direction.angle == "down") {
    movementCharacter.z = -1;
  }
};

const JoyStrikEnd = (d) => {
  movementCharacter.z = 0;
  movementCharacter.x = 0;
};

function App() {
  const { cameraControlMode, setCameraControlMode } = useCameraControlStore();

  return (
    <div>
      <PopupButton />
      <Scene />
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
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          width: "50px",
          height: "50px",
          textAlign: "center",
          bottom: "52px",
          right: "0px",
        }}
      >
        {cameraControlMode == "character" ? (
          <p
            style={{ textAlign: "center", fontSize: "10px" }}
            onClick={(e) => {
              setCameraControlMode("orbit");
            }}
          >
            360-View
          </p>
        ) : (
          <p
            style={{ textAlign: "center", fontSize: "10px" }}
            onClick={(e) => {
              setCameraControlMode("character");
            }}
          >
            Character-view
          </p>
        )}
      </button>
    </div>
  );
}

export default App;

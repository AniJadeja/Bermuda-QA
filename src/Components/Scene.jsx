import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import { CharacterController } from "./Character/CharacterControls";

const Scene = () => {
  return (
    <>
      <Physics debug>
        <Hall/>
        <Camera />
       <CharacterController/>
      </Physics>
    </>
  );
};

export default Scene;

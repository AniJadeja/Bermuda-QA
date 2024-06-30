import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";

const Scene = () => {
  return (
    <>
      <Physics>
        <Hall/>
        <Camera />
        <Character/>
      </Physics>
    </>
  );
};

export default Scene;

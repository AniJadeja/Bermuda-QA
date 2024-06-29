import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera";
import Character from "./Character";

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

import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera";

const Scene = () => {
  return (
    <>
      <Physics>
        <Hall/>
        <Camera BoundingObject={'/assets/Hall/Hall.glb'} />
      </Physics>
    </>
  );
};

export default Scene;

import { Physics } from "@react-three/rapier";
import Hall from "./Hall";

const Scene = () => {
  return (
    <>
      <Physics>
        <Hall/>
      </Physics>
    </>
  );
};

export default Scene;

import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import Question from "./Question/Question";

const Scene = () => {
  return (
    <>
      <Physics>
        <Hall/>
        <Camera />
        <Character/>
        <Question/>
      </Physics>
    </>
  );
};

export default Scene;

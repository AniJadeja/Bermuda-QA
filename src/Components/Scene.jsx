import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import { CharacterController } from "./Character/CharacterControls";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
      <h1
        style={{
        /*   color: "white", */
        alignContent:"center"
        }}
      >
        Loading ...
      </h1>
    </Html>
  );
};
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];
const Scene = () => {
  return (
    <>
      <KeyboardControls map={keyboardMap} >
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        style={{
          height: "100vh",
        }}
      >

<Suspense fallback={<Loader />}>
      <Physics debug>
        <Hall/>
        <Camera />
       <CharacterController/>
      </Physics>
      </Suspense>
      </Canvas>
 
    </div>
    </KeyboardControls>
    </>
  );
};

export default Scene;

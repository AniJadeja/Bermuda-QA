import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import { CharacterController } from "./Character/CharacterControls";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, Environment } from "@react-three/drei";
import * as THREE from "three";
import Question from "./Question/Question";
import PointingCharacter from "./PointingCharacter";

const Loader = () => {
  return (
    <Html>
      <h1 style={{ alignContent: "center" }}>Loading ...</h1>
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
      <KeyboardControls map={keyboardMap}>
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
              <Physics>
                <Environment
                  files="/assets/street.hdr" // Replace with your actual HDRI file path
                  background // Whether to set the environment map as the scene background
                  encoding={THREE.sRGBEncoding} // Optional, for better color rendering
                  intensity={0}
                />
                <Hall />
                <Camera />
                <CharacterController />
                <PointingCharacter />
                <Question />
              </Physics>
            </Suspense>
          </Canvas>
        </div>
      </KeyboardControls>
    </>
  );
};

export default Scene;

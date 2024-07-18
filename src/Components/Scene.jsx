import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import { CharacterController } from "./Character/CharacterControls";
import { KeyboardControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Html, Environment } from "@react-three/drei";
import Question from "./Question/Question";
import PointingCharacter from "./PointingCharacter";
import DisplayAnswers from "./AnswerPopup/DisplayAnswers";
import { create } from "zustand";

export const useLoadStatusStore = create((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));

const Loader = () => {
  const { progress } = useProgress();
  const setLoading = useLoadStatusStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    return () => setLoading(false);
  }, [setLoading]);

  return (
    <Html center>
      <div style={{ display: 'flex', justifyContent: 'center', height: 'auto', width: '100vw', margin: 'auto' }}>
        <h1 style={{ textAlign: 'center' }}>Loading {progress.toFixed(2)}%</h1>
      </div>
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
                <Hall />
                <Camera />
                <CharacterController />
                <PointingCharacter animation={"Armature|Take 001|BaseLayer"} />
                <DisplayAnswers />
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

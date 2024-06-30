import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Suspense } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import useCounterStore from "./Components/GlobalData/GlobalData";
import { KeyboardControls } from "@react-three/drei";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function App() {
  const { Orbitcontroll, increment, decrement } = useCounterStore();
  return (
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
          <Scene />
        </Suspense>
      </Canvas>
      <div style={{position:"absolute"}}>
      <button  onClick={increment}> true</button>
      <button  onClick={decrement}>false</button>
      </div>
    </div>
    </KeyboardControls>
  );
}

const Loader = () => {
  return (
    <Html>
      <h1
        style={{
        /*   color: "white", */
          textAlign: "center",
        }}
      >
        Loading ...
      </h1>
    </Html>
  );
};

export default App;

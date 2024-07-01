import { Canvas } from "@react-three/fiber";
import Scene from "./Components/Scene";
import { Suspense } from "react";
import { Html, OrbitControls } from "@react-three/drei";
function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas style={{ height: "100vh" }}>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

const Loader = () => {
  return (
    <Html>
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        Loading ...
      </h1>
    </Html>
  );
};

export default App;

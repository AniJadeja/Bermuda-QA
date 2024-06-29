// Camera.jsx

import React, { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, Box3 } from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { setCameraRef } from "./CameraControls";

const Camera = ({ BoundingObject }) => {
  const { camera, scene } = useThree();
  const controlsRef = useRef();
  const BoundingRef = useRef();
  const { scene: BoundingScene } = useGLTF(BoundingObject);
  const [isPanning, setIsPanning] = useState(false);
  const lastPosition = useRef(new Vector3());

  useEffect(() => {
    if (BoundingScene) {
      BoundingRef.current = BoundingScene.clone();
      scene.add(BoundingRef.current);
    }

    const handleKeyDown = (e) => {
      if (e.shiftKey) setIsPanning(true);
    };
    const handleKeyUp = (e) => {
      if (!e.shiftKey) setIsPanning(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera, BoundingScene, scene]);

  useEffect(() => {
    if (controlsRef.current) {
      // camera.position.set(
      //   -3, // rotation
      //   1, // distance from top
      //   4 // zoom
      // ); // Set initial position
      setCameraRef(camera);
      camera.position.x = 0.3;
      camera.position.y = 2.27;
      camera.position.z = 6.8;
    //  lastPosition.current.copy(camera.position);
    }
  }, []);

  useFrame(() => {
    // Only log if the camera has actually moved
    if (!camera.position.equals(lastPosition.current)) {
      //lastPosition.current.copy(camera.position);
    }
    // }
  });

  return (
    <>
     <OrbitControls
      ref={controlsRef}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.3}
      enablePan={false}
      enableRotate={!isPanning}
      panSpeed={0.5}
      enableZoom={true}
      zoomSpeed={1.5}
      minDistance={1}
      maxDistance={7}
    />

    </>


   
  );
};

export default Camera;

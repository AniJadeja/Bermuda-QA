import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3, Box3 } from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { setCameraRef } from "./CameraControls";

const Camera = ({ BoundingObject }) => {
  const { camera, scene } = useThree();
  const controlsRef = useRef();
  const BoundingRef = useRef();
  const { scene: BoundingScene } = useGLTF(BoundingObject);

  useEffect(() => {
    if (controlsRef.current) {
      camera.position.set(0, 4, 1);
      camera.lookAt(0, 0, 0);
      setCameraRef(camera);
    }
    if (BoundingScene) {
      BoundingRef.current = BoundingScene.clone();
      scene.add(BoundingRef.current);
    }
  }, [camera, BoundingScene, scene]);

  useFrame(() => {
    if (BoundingRef.current && controlsRef.current) {
      const BoundingBounds = new Box3().setFromObject(BoundingRef.current);

      // Add some padding to keep camera slightly inside the bounds
      const padding = 0.5;
      const minBounds = BoundingBounds.min
        .clone()
        .add(new Vector3(padding, padding, padding));
      const maxBounds = BoundingBounds.max
        .clone()
        .sub(new Vector3(padding, padding, padding));

      // Clamp camera position
      camera.position.x = Math.max(
        minBounds.x,
        Math.min(maxBounds.x, camera.position.x)
      );
      camera.position.y = Math.max(
        minBounds.y,
        Math.min(maxBounds.y, camera.position.y)
      );
      camera.position.z = Math.max(
        minBounds.z,
        Math.min(maxBounds.z, camera.position.z)
      );

      // Update OrbitControls target to the center of the Bounding
      const BoundingCenter = new Vector3();
      BoundingBounds.getCenter(BoundingCenter);
      controlsRef.current.target.copy(BoundingCenter);
    }
  });

  return (
    <OrbitControls
    ref={controlsRef}
    minPolarAngle={Math.PI / 2.5}
    maxPolarAngle={Math.PI / 1.2}
    enablePan={true}
    panSpeed={0.5}
    enableZoom={true}
    zoomSpeed={1.5}
    minDistance={1}
    maxDistance={7}
      
    />
  );
};

export default Camera;

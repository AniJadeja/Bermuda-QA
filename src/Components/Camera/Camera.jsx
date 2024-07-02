// Camera.jsx

import React, { useRef, useEffect } from "react";
import { useThree} from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import { setCameraRef } from "./CameraControls";
import { RigidBody } from "@react-three/rapier";

const Camera = () => {

  
  const { camera } = useThree();
  const controlsRef = useRef();

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



  return (
    <>
     
    { <OrbitControls
        ref={controlsRef}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        enablePan={false}
        enableRotate={true}
        panSpeed={0.5}
        enableZoom={true}
        zoomSpeed={1.5}
        minDistance={1}
        maxDistance={7}
      /> } 
   
    </>
  );
};

export default Camera;

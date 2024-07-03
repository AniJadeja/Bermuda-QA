// Camera.jsx

import React, { useRef, useEffect } from "react";

import { OrbitControls} from "@react-three/drei";

const Orbit = (props) => {

  



  return (
    <>
     
    { <OrbitControls
        ref={props&&props.OrbitRef}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        enablePan={false}
        enableRotate={true}
        panSpeed={0.5}
        enableZoom={true}
        zoomSpeed={1.5}
        minDistance={1}
        maxDistance={7}
        autoRotate={true}
        rotateSpeed={.001}
      /> } 
   
    </>
  );
};

export default Orbit;

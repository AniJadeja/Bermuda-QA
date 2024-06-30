import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useMobileScreen } from "../../Context/ScreenContext.jsx";

const Character = ({animation,...props}) => {
  const group = useRef();
  const rigidBodyRef = useRef();
  const { scene, animations } = useGLTF("/assets/Character/Character.glb");
  const { actions } = useAnimations(animations, group);
  const isMobile = useMobileScreen();
  
  useEffect(() => {
    actions[animation].fadeOut(0.5).reset().fadeIn(0.5).play();
    scene.rotation.y = Math.PI;
   
    console.log("isMobileScreen : ", isMobile)
  }, [isMobile]);

  return (

    <group ref={group} {...props} dispose={null}>
    <primitive object={scene} rotation={[0,-Math.PI,0]} />
      </group>
     
  
  );
};

export default Character;

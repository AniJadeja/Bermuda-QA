import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const PointingCharacter = ({ animation, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/assets/Character/pointing_char.glb");
  const { actions } = useAnimations(animations, group);

  const charPosition = [6,0.18,-7.5]
  const colliderPosition = [charPosition[0], charPosition[1]+1, charPosition[2]]

  useEffect(()=>{
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24); 
  },[animation])
  

  return (
    <RigidBody type="fixed" >
      <group position={charPosition} rotation={[0,2.5,0]} ref={group} {...props} dispose={null}>
        <primitive  object={scene} rotation={[0, -Math.PI, 0]} />
      </group>
      <CapsuleCollider args={[0.7, 0.3]} position={colliderPosition} />
    </RigidBody>
  );
};

export default PointingCharacter;

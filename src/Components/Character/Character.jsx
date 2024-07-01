import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const Character = () => {
  const group = useRef();
  const rigidBodyRef = useRef();
  const { scene, animations } = useGLTF("/assets/Character/Character.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["idle"].fadeOut(0.5).reset().fadeIn(0.5).play();
    scene.rotation.y = Math.PI;
    
  }, []);

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rigidBodyRef}
      position={[0, 3, -4]}
      rotation={[0, 0, 0]}
    >
      <primitive object={scene} ref={group} position={[0, 2, 0]} />
      <CapsuleCollider args={[0.9, 0.3]} position={[0, 3, 0]} />
    </RigidBody>
  );
};

export default Character;

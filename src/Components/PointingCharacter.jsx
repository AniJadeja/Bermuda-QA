import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const PointingCharacter = ({ animation, ...props }) => {
  const group = useRef();
  const rigidBodyRef = useRef();
  const { scene, animations } = useGLTF("/assets/Character/Character2.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group position={[6,0.18,-7.5]} rotation={[0,2.5,0]} ref={group} {...props} dispose={null}>
        <primitive  object={scene} rotation={[0, -Math.PI, 0]} />
      </group>
    </RigidBody>
  );
};

export default PointingCharacter;

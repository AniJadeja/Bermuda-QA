import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Character = () => {
    const group = useRef();
    const { scene, animations } = useGLTF('/assets/Character/Character.glb');
    const { actions } = useAnimations(animations,group);

    useEffect(()=>{
        actions[
            "idle"
        ].fadeOut(0.5).reset().fadeIn(0.5).play();

        scene.rotation.y = Math.PI;
        scene.position.x = 2;
        scene.position.z = -4;
        
    },[])


    return (
      <RigidBody type="fixed" colliders="ball">
        <primitive object={scene} ref={group} />
      </RigidBody>
    )

 
}

export default Character
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "./Character";
import { useEffect, useRef, useState } from "react";
import { Vector3, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Text3D, useKeyboardControls } from "@react-three/drei";
import { useRefs } from "../../Ref/ref";
import { degToRad } from "three/src/math/MathUtils.js";
import Orbit from "../Orbit/Orbit";
import {useCameraControlStore }from "../GlobalData/GlobalData";
export let movementCharacter={
  x:0,
  y:0
}
export const CharacterController = () => {

  const [animation, setAnimation] = useState("idle");
  const [, get] = useKeyboardControls();

  const {
    rb,
    container,
    cameraPosition,
    cameraLookAt,
    cameraWorldPosition,
    cameraTarget,
    character,
    cameraLookAtWorldPosition,
    rotationTarget,
    characterRotationTarget,
    Orbitcontroll,
    increment,
    decrement,
  } = useRefs();
  const { cameraControlMode, setCameraControlMode } = useCameraControlStore();
  const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  };

  const [count, setCount] = useState(8);

  // Event listener for mouse wheel scroll
  const handleScroll = (event) => {
    const minValue = 5; // Minimum value for count
    const maxValue = 12; // Maximum value for count
  
    if (event.deltaY > 0) {
      // Scroll down
      setCount((prevCount) => {
        const nextCount = prevCount - 0.1;
        return nextCount >= minValue ? nextCount : minValue;
      });
    } else {
      // Scroll up
      setCount((prevCount) => {
        const nextCount = prevCount + 0.1;
        return nextCount <= maxValue ? nextCount : maxValue;
      });
    }
  };
  

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('wheel', handleScroll);
    cameraPosition.current

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount


  const lerpAngle = (start, end, t) => {
    start = normalizeAngle(start);
    end = normalizeAngle(end);

    if (Math.abs(end - start) > Math.PI) {
      if (end > start) {
        start += 2 * Math.PI;
      } else {
        end += 2 * Math.PI;
      }
    }

    return normalizeAngle(start + (end - start) * t);
  };

  const isClicking = useRef(false);
  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    // touch
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);




  // State to determine camera control mode
 /*  const [cameraControlMode, setCameraControlMode] = useState("character"); */

  useFrame(({ camera, mouse }) => {
    if (cameraControlMode === "character") {
      if (rb.current) {
        const vel = rb.current.linvel();

    const movement = {
          x: 0,
          z: 0,
        };

        if(movementCharacter.x>0||movementCharacter.x<0){
          movement.x= movementCharacter.x
        }

        if(movementCharacter.z>0||movementCharacter.z<0){
          movement.z= movementCharacter.z
        }


    
        if (get().forward) {
          movement.z = 1;
        }
        if (get().backward) {
          movement.z = -1;
        }

        let speed = 1

     /*    if (isClicking.current) {
          if (Math.abs(mouse.x) > 0.1) {
            movement.x = -mouse.x;
          }
          movement.z = mouse.y + 0.4;
          if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
            speed = RUN_SPEED;
          }
        } */

        if (get().left) {
          movement.x = 1; 
        }
        if (get().right) {
          movement.x = -1; 
        }

        if (movement.x !== 0) {
          rotationTarget.current +=  degToRad(0.5) * movement.x;
        }

         if (movement.x !== 0 || movement.z !== 0) {
          characterRotationTarget.current = Math.atan2(movement.x,movement.z);
          vel.x =-Math.sin(rotationTarget.current + characterRotationTarget.current)*speed;
          vel.z =-Math.cos(rotationTarget.current + characterRotationTarget.current)*speed;
          setAnimation("Walking");
        } else {
          setAnimation("idle");
        }
          
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        ); 

        rb.current.setLinvel(vel, true);
      }

      // Character rotation
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );

      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
        cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

        camera.lookAt(cameraLookAt.current);
      }
    } else if (cameraControlMode === "orbit") {
      // OrbitControls for camera movement
      Orbitcontroll.current.update();
    }
  });



  return (
    <>
      <RigidBody colliders={false} lockRotations ref={rb}>
        <ambientLight />
        <group ref={container}>
        
          <group ref={cameraTarget} position-z={-8} />
          <group ref={cameraPosition} position-y={count} position-z={count/2} />
          <group ref={character}>
            <Character position={[0, 3, 0]} animation={animation} />
          </group>
        </group>

        <CapsuleCollider args={[0.7, 0.3]} position={[0, 4, 0]} />
      </RigidBody>

      {/* Toggle camera control mode */}
     
      

      {/* OrbitControls */}
      {cameraControlMode === "orbit" && <Orbit OrbitRef={Orbitcontroll} />}
    </>
  );
};

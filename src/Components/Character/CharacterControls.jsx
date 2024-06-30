import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "./Character";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

import useCounterStore from "../GlobalData/GlobalData";
import { useKeyboardControls } from "@react-three/drei";
import { useRefs } from "../../Ref/ref";
export const CharacterController = () => {
  const [animation, setAnimation] = useState("idle");
  const [, get] = useKeyboardControls();
  const { Orbitcontroll, increment, decrement } = useCounterStore();
  const {
    rb,
    container,
    cameraPosition,
    cameraLookAt,
    cameraWorldPosition,
    cameraTarget,
    character,
    cameraLookAtWorldPosition,
  } = useRefs();
  const VELOCITY = 1;

  useFrame(
    ({ camera }) => {
      if (rb.current) {
        setAnimation("idle");

        const vel = rb.current.linvel();

        const movement = {
          x: 0,
          z: 0,
        };

        if (get().forward) {
          movement.z = -1;
          setAnimation("Walking");
        }
        if (get().backward) {
          movement.z = 1;
          setAnimation("Walking");
        }

        if (get().left) {
          movement.x = -1;
          setAnimation("Walking");
        }
        if (get().right) {
          movement.x = 1;
          setAnimation("Walking");
        }

        if (movement.x !== 0 || movement.z !== 0) {
          vel.z = VELOCITY * movement.z;
          vel.x = VELOCITY * movement.x;
        }

        rb.current.setLinvel(vel, true);
      }

      if (!Orbitcontroll) {
        cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
        camera.position.lerp(cameraWorldPosition.current, 0.1);
        if (cameraTarget.current) {
          cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
          cameraLookAt.current.lerp(cameraWorldPosition.current, 0.1);
          camera.lookAt(cameraLookAt.current);
        }
      }
    },
    [Orbitcontroll]
  );
 

  return (
    <>
      <RigidBody colliders={false} lockRotations ref={rb}>
        <ambientLight />
        <group ref={container}>
          {!Orbitcontroll && (
            <>
              <group ref={cameraTarget} position-z={1.5} />
              <group
                ref={cameraPosition}
                position-y={6}
                position-z={5}
                rotation-y={Math.PI}
              />
            </>
          )}
          <group ref={character}>
            <Character position={[0, 3, 0]} animation={animation} />
          </group>
        </group>

        <CapsuleCollider args={[0.7, 0.3]} position={[0, 4, 0]} />
      </RigidBody>
    </>
  );
};

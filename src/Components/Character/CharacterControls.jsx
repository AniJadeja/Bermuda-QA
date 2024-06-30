import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "./Character";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";


import useCounterStore from "../GlobalData/GlobalData";
import { useKeyboardControls } from "@react-three/drei";
import { useRefs } from "../../Ref/ref";
export const CharacterController = () => {



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
    cameraLookAtWorldPosition
  } = useRefs();

  useFrame(({ camera }) => {
    //console.log("Orbitcontroll",Orbitcontroll)

    if (rb.current) {

      const vel = rb.current.linvel();

      console.log("vel----------", vel)

      const movement = {

        x: 0,
        z: 0
      }

      if (get().forward) {
        movement.z = -1;
      }
      if (get().backward) {
        movement.z = 1;
      }



      if (get().left) {
        movement.x = -1;
      }
      if (get().right) {
        movement.x = 1;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        vel.z = 5 * movement.z
        vel.x = 5 * movement.x
      }

      rb.current.setLinvel(vel, true)





    }



    if (!Orbitcontroll) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
      if (cameraTarget.current) {
        cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
        cameraLookAt.current.lerp(cameraWorldPosition.current, 0.1);
        //camera.lookAt(cameraLookAt.current)

      }
    }


  }, [Orbitcontroll])
  useEffect(() => {
    console.log("Orbitcontroll", Orbitcontroll)



  }, [Orbitcontroll])




  return (<>

    <RigidBody colliders={false} lockRotations ref={rb}>
      <ambientLight />
      <group ref={container}>
        {!Orbitcontroll && <><group ref={cameraTarget} position-z={1.5} />
          <group ref={cameraPosition} position-y={6} position-z={5} rotation-y={Math.PI} /></>}
        <group ref={character} >
          <Character position={[0, 3, 0]} animation={"idle"} />
        </group>
      </group>

      <CapsuleCollider args={[.7, .3]} position={[0, 4, 0]} />
    </RigidBody>



  </>)
}
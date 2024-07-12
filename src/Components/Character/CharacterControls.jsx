import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "./Character";
import { useEffect, useRef, useState } from "react";
import { Vector3, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import { OrbitControls, Text, Text3D, useKeyboardControls } from "@react-three/drei";
import { useRefs } from "../../Ref/ref";
import { degToRad } from "three/src/math/MathUtils.js";
import Orbit from "../Orbit/Orbit";
import { useCameraControlStore } from "../GlobalData/GlobalData";

export let movementCharacter = {
  x: 0,
  y: 0,
};

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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const initialMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      initialMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
      if (isMouseDown) {
        const deltaX = event.clientX - initialMousePosition.current.x;
        rotationTarget.current -= degToRad(0.5) * deltaX; // Changed += to -=

        initialMousePosition.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown]);

  const handleScroll = (event) => {
    const minValue = 5;
    const maxValue = 12;

    const scrollDirection = event.deltaY > 0 ? "down" : "up";

    if (
      (scrollDirection === "down" && count > minValue) ||
      (scrollDirection === "up" && count < maxValue)
    ) {
      setCount((prevCount) => {
        if (scrollDirection === "down") {
          return Math.max(prevCount - 1, minValue);
        } else {
          return Math.min(prevCount + 1, maxValue);
        }
      });
    }
  };

  useEffect(() => {
    console.log("count", count);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

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
    const onMouseDown = () => {
      isClicking.current = true;
    };

    const onMouseUp = () => {
      isClicking.current = false;
    };

    const onTouchStart = (e) => {
      isClicking.current = true;
      initialMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e) => {
      if (isClicking.current) {
        const deltaX = e.touches[0].clientX - initialMousePosition.current.x;
        rotationTarget.current -= degToRad(0.01) * deltaX; // Changed += to -=

        initialMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isClicking.current = false;
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);

      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
    if (cameraControlMode === "character") {
      if (rb.current) {
        const vel = rb.current.linvel();

        const movement = {
          x: 0,
          z: 0,
        };

        if (movementCharacter.x > 0 || movementCharacter.x < 0) {
          console.log("movementCharacter x", movementCharacter.x);
          movement.x = movementCharacter.x;
        }

        if (movementCharacter.z > 0 || movementCharacter.z < 0) {
          console.log("movementCharacter z", movementCharacter.z);
          movement.z = movementCharacter.z;
        }

        if (get().forward) {
          movement.z = 1;
        }
        if (get().backward) {
          movement.z = -1;
        }

        let speed = 1;

        if (get().left) {
          movement.x = 1;
        }
        if (get().right) {
          movement.x = -1;
        }

        if (movement.x !== 0) {
          rotationTarget.current += degToRad(0.5) * movement.x;
        }

        if (movement.x !== 0 || movement.z !== 0) {
          characterRotationTarget.current = Math.atan2(movement.x, movement.z);
          vel.x = -Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
          vel.z = -Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;
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

      cameraPosition.current.position.y = count;
      cameraPosition.current.position.z = count / 2;

      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );

      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 1);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
        cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 1);

        camera.lookAt(cameraLookAt.current);
      }
    } else if (cameraControlMode === "orbit") {
      Orbitcontroll.current.update();
    }
  });

  return (
    <>
      {console.log("count", count)}
      <RigidBody colliders={false} lockRotations ref={rb}>
        <ambientLight />
        <group ref={container}>
          <group ref={cameraTarget} position-z={-8} />
          <group ref={cameraPosition} position-y={8} position-z={7} />
          <group ref={character}>
            <Character position={[0, 3, 0]} animation={animation} />
          </group>
        </group>
        <CapsuleCollider args={[0.7, 0.3]} position={[0, 4, 0]} />
      </RigidBody>

      {cameraControlMode === "orbit" && <Orbit OrbitRef={Orbitcontroll} />}
    </>
  );
};

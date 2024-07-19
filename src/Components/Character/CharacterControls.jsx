// CharacterControls.jsx

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
import { useCharacterState } from '../../Context/characterContext';

export let movementCharacter = {
  x: 0,
  y: 0,
};

export const CharacterController = () => {
  const [animation, setAnimation] = useState("idle");
  const [, get] = useKeyboardControls();
  const { IS_CHARACTER_MOVABLE } = useCharacterState();

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

  const [isMouseDown, setIsMouseDown] = useState(false);
  const initialMousePosition = useRef({ x: 0, y: 0 });
  const [cameraTilt, setCameraTilt] = useState(0);
  const [cameraDistance, setCameraDistance] = useState(8);
  const MAX_TILT_ANGLE = Math.PI / 3; // 60 degrees
  const CAMERA_MOVE_SPEED = 0.35; // Speed multiplier for camera movement

  const [lockXRotation, setLockXRotation] = useState(false);
  const [lockYRotation, setLockYRotation] = useState(false);
  const [lockZoom, setLockZoom] = useState(false);

  const VERTICAL_THRESHOLD = 10; // Adjust this value as needed
  const SMOOTHING_FACTOR = 0.5; // Adjust for more or less smoothing

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      initialMousePosition.current = { x: event.clientX, y: event.clientY };
      document.body.style.cursor = 'none'; // Hide the cursor
      document.body.requestPointerLock(); // Lock the pointer
    };

    const handleMouseMove = (event) => {
      if (isMouseDown) {
        const deltaX = (event.movementX || event.mozMovementX || event.webkitMovementX || 0) * CAMERA_MOVE_SPEED;
        const deltaY = (event.movementY || event.mozMovementY || event.webkitMovementY || 0) * CAMERA_MOVE_SPEED;
        
        rotationTarget.current -= degToRad(0.5) * deltaX; 

        setCameraTilt(prevTilt => {
          const newTilt = prevTilt + degToRad(0.5) * deltaY;
          return Math.max(-MAX_TILT_ANGLE, Math.min(MAX_TILT_ANGLE, newTilt));
        });
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      document.body.style.cursor = 'default'; // Show the cursor
      document.exitPointerLock(); // Unlock the pointer
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown, lockXRotation, lockYRotation]);

  const handleScroll = (event) => {
    const zoomSpeed = 0.001;
    setCameraDistance(prevDistance => {
      const newDistance = prevDistance + event.deltaY * zoomSpeed;
      return Math.max(2, Math.min(8, newDistance)); // Limit zoom between 2 and 20
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [lockZoom]);

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
        const deltaX = (e.touches[0].clientX - initialMousePosition.current.x) * CAMERA_MOVE_SPEED;
        const deltaY = (e.touches[0].clientY - initialMousePosition.current.y) * CAMERA_MOVE_SPEED;
        
        rotationTarget.current -= degToRad(0.1) * deltaX;

        if (!lockYRotation) {
          rotationTarget.current -= degToRad(0.1) * deltaX;
        }

        if (!lockXRotation && Math.abs(deltaY) > VERTICAL_THRESHOLD) {
          setCameraTilt(prevTilt => {
            const newTilt = prevTilt + degToRad(0.1) * (deltaY - Math.sign(deltaY) * VERTICAL_THRESHOLD);
            return Math.max(-MAX_TILT_ANGLE, Math.min(MAX_TILT_ANGLE, newTilt));
          });
        }

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
  }, [lockXRotation, lockYRotation]);

  useFrame(({ camera, mouse }) => {
    if (cameraControlMode === "character" && IS_CHARACTER_MOVABLE) {
      if (rb.current) {
        const vel = rb.current.linvel();

        const movement = {
          x: 0,
          z: 0,
        };

        if (movementCharacter.x > 0 || movementCharacter.x < 0) {
          movement.x = movementCharacter.x;
        }

        if (movementCharacter.z > 0 || movementCharacter.z < 0) {
          movement.z = movementCharacter.z;
        }

        if (get().forward) {
          movement.z = 1;
        }
        if (get().backward) {
          movement.z = -1;
        }
        if (get().left) {
          movement.x = 1;
        }
        if (get().right) {
          movement.x = -1;
        }

        let speed = 1;
        let isMoving = false;

        if (movement.x !== 0 || movement.z !== 0) {
          isMoving = true;
          characterRotationTarget.current = container.current.rotation.y + Math.atan2(movement.x, movement.z);
          vel.x = -Math.sin(characterRotationTarget.current) * speed;
          vel.z = -Math.cos(characterRotationTarget.current) * speed;
          setAnimation("Walking");
        } else {
          setAnimation("idle");
        }

        if (isMoving) {
          character.current.rotation.y = lerpAngle(
            character.current.rotation.y,
            characterRotationTarget.current,
            0.1
          );
        }

        rb.current.setLinvel(vel, true);
      }

      cameraPosition.current.position.y = cameraDistance;
      cameraPosition.current.position.z = cameraDistance / 2;

      // Apply smoothing to rotation
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        SMOOTHING_FACTOR
      );

      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.copy(cameraWorldPosition.current);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);

        const tiltedLookAt = cameraLookAtWorldPosition.current.clone();
        tiltedLookAt.y += Math.tan(cameraTilt) * cameraDistance;

        camera.lookAt(tiltedLookAt);

        // Apply smoothing to tilt
        const currentTilt = camera.rotation.x;
        const targetTilt = Math.atan2(tiltedLookAt.y - camera.position.y, cameraDistance);
        camera.rotation.x = MathUtils.lerp(currentTilt, targetTilt, SMOOTHING_FACTOR);
      }
    } else if (cameraControlMode === "orbit") {
      Orbitcontroll.current.update();
    }
  });

  return (
    <>
      <RigidBody colliders={false} lockRotations ref={rb}>
        <ambientLight />
        <group ref={container}>
          <group ref={cameraTarget} position-z={-8} />
          <group ref={cameraPosition} position-y={8} position-z={7} />
        </group>
        <group ref={character}>
          <Character position={[0, 3, 0]} animation={animation} />
        </group>
        <CapsuleCollider args={[0.7, 0.3]} position={[0, 4, 0]} />
      </RigidBody>

      {cameraControlMode === "orbit" && <Orbit OrbitRef={Orbitcontroll} />}
    </>
  );
};

import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Character from "./Character";
import { useEffect, useRef, useState } from "react";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRefs } from "../../Ref/ref";
import { degToRad } from "three/src/math/MathUtils.js";
import Orbit from "../Orbit/Orbit";
import { useCameraControlStore } from "../GlobalData/GlobalData";
import { useCharacterState } from "../../Context/characterContext";

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
    cameraWorldPosition,
    cameraTarget,
    character,
    cameraLookAtWorldPosition,
    rotationTarget,
    characterRotationTarget,
    Orbitcontroll,
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
  const DESKTOP_CAMERA_MOVE_SPEED = 0.1;
  const MOBILE_CAMERA_MOVE_SPEED = 2;

  const MIN_CAMERA_DISTANCE = 4;
  const MAX_CAMERA_DISTANCE = 9;
  const ZOOM_SPEED = 0.001;
  const MOBILE_ZOOM_SPEED = 0.01;

  const initialPinchDistance = useRef(null);

  const isInJoystickArea = (x, y) => {
    const joystickRadius = 50; // Half of the joystick width/height
    const joystickCenterX = 50 + joystickRadius; // Left position + radius
    const joystickCenterY = window.innerHeight - (50 + joystickRadius); // Bottom position + radius

    const distanceFromCenter = Math.sqrt(
      Math.pow(x - joystickCenterX, 2) + Math.pow(y - joystickCenterY, 2)
    );

    return distanceFromCenter <= joystickRadius;
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      initialMousePosition.current = { x: event.clientX, y: event.clientY };
      document.body.style.cursor = "grabbing";
    };

    const handleMouseMove = (event) => {
      if (isMouseDown) {
        const deltaX =
          (event.movementX ||
            event.mozMovementX ||
            event.webkitMovementX ||
            0) * DESKTOP_CAMERA_MOVE_SPEED;
        const deltaY =
          (event.movementY ||
            event.mozMovementY ||
            event.webkitMovementY ||
            0) * DESKTOP_CAMERA_MOVE_SPEED;

        rotationTarget.current -= degToRad(0.5) * deltaX;

        setCameraTilt((prevTilt) => {
          const newTilt = prevTilt - degToRad(0.5) * deltaY;
          return Math.max(-MAX_TILT_ANGLE, Math.min(MAX_TILT_ANGLE, newTilt));
        });
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      document.body.style.cursor = "default";
    };

    const handleScroll = (event) => {
      setCameraDistance((prevDistance) => {
        const newDistance = prevDistance + event.deltaY * ZOOM_SPEED;
        return Math.max(MIN_CAMERA_DISTANCE, Math.min(MAX_CAMERA_DISTANCE, newDistance));
      });
    };

    const handleTouchZoom = (event) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );

        if (initialPinchDistance.current === null) {
          initialPinchDistance.current = distance;
        } else {
          const pinchDelta = distance - initialPinchDistance.current;
          setCameraDistance((prevDistance) => {
            const newDistance = prevDistance - pinchDelta * MOBILE_ZOOM_SPEED;
            return Math.max(MIN_CAMERA_DISTANCE, Math.min(MAX_CAMERA_DISTANCE, newDistance));
          });
          initialPinchDistance.current = distance;
        }
      }
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!isInJoystickArea(touch.clientX, touch.clientY)) {
        isClicking.current = true;
        initialMousePosition.current = {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
      initialPinchDistance.current = null;
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        handleTouchZoom(e);
      } else if (isClicking.current && e.touches.length === 1) {
        const touch = e.touches[0];
        if (!isInJoystickArea(touch.clientX, touch.clientY)) {
          const deltaX =
            (touch.clientX - initialMousePosition.current.x) * MOBILE_CAMERA_MOVE_SPEED;
          const deltaY =
            (touch.clientY - initialMousePosition.current.y) * MOBILE_CAMERA_MOVE_SPEED;

          rotationTarget.current -= degToRad(0.1) * deltaX;

          setCameraTilt((prevTilt) => {
            const newTilt = prevTilt - degToRad(0.1) * deltaY;
            return Math.max(-MAX_TILT_ANGLE, Math.min(MAX_TILT_ANGLE, newTilt));
          });

          initialMousePosition.current = {
            x: touch.clientX,
            y: touch.clientY,
          };
        }
      }
    };

    const onTouchEnd = () => {
      isClicking.current = false;
      initialPinchDistance.current = null;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleScroll);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleScroll);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMouseDown]);

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
          characterRotationTarget.current =
            container.current.rotation.y + Math.atan2(movement.x, movement.z);
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

      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );

      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.copy(cameraWorldPosition.current);

      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);

        const tiltedLookAt = cameraLookAtWorldPosition.current.clone();
        tiltedLookAt.y += Math.tan(cameraTilt) * cameraDistance;

        camera.lookAt(tiltedLookAt);
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
import { useRef } from 'react';
import { Vector3 } from 'three'; // Assuming you're using Three.js for Vector3

export const useRefs = () => {
  const rb = useRef(null);
  const container = useRef(null);
  const cameraTarget = useRef(null);
  const cameraPosition = useRef(null);
  const character = useRef(null);
 
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  return {
    rb,
    container,
    cameraTarget,
    cameraPosition,
    character,
    cameraWorldPosition,
    cameraLookAtWorldPosition,
    cameraLookAt,
  };
};

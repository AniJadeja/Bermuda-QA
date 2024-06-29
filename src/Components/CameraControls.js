// cameraControls.js
import { Vector3 } from 'three';

let cameraRef = null;

export const setCameraRef = (ref) => {
  cameraRef = ref;
};

export const moveCamera = (x, y, z) => {
  if (cameraRef) {
    const newPosition = new Vector3(x, y, z);
    cameraRef.position.copy(newPosition);
  }
};

export const rotateCamera = (x, y, z) => {
  if (cameraRef) {
    cameraRef.rotation.set(x, y, z);
  }
};
import { Physics } from "@react-three/rapier";
import Hall from "./Hall";
import Camera from "./Camera/Camera";
import Character from "./Character/Character";
import { CharacterController } from "./Character/CharacterControls.jsx";
import Question from "./Question/Question";
import { Environment, Text } from "@react-three/drei";
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';

const Scene = () => {
  return (
    <>
      <Physics>
      <Environment
          files="/assets/street.hdr" // Replace with your actual HDRI file path
          background // Whether to set the environment map as the scene background
          encoding={THREE.sRGBEncoding} // Optional, for better color rendering
          intensity={0}
        />
        <Hall />
        <Camera />
         <CharacterController/>
        <Question />
      </Physics>
    </>
  );
};

export default Scene;

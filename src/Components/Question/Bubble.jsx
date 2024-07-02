import React from 'react';
import { Text } from '@react-three/drei';

const BubbleText = ({ children, position, fontSize, bubbleSize }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[bubbleSize, 32, 32]} /> {/* Creates a sphere geometry */}
        <meshStandardMaterial color="white" transparent opacity={0.8} /> {/* Adjust color and opacity */}
      </mesh>
      <Text position={[0, 0, bubbleSize + 0.1]} fontSize={fontSize} color="black">
        {children}
      </Text>
    </group>
  );
};

export default BubbleText;

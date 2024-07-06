import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useMemo, useCallback, useState } from "react";
import { Text, useCursor } from "@react-three/drei";

const RoundedBox = React.forwardRef(
  ({ args = [1, 1, 1], radius = 0.05, smoothness = 4, ...props }, ref) => {
    const shape = useMemo(() => {
      const shape = new THREE.Shape();
      const [width, height] = args;
      const x = -width / 2;
      const y = -height / 2;
      shape.moveTo(x, y + radius);
      shape.lineTo(x, y + height - radius);
      shape.quadraticCurveTo(x, y + height, x + radius, y + height);
      shape.lineTo(x + width - radius, y + height);
      shape.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      );
      shape.lineTo(x + width, y + radius);
      shape.quadraticCurveTo(x + width, y, x + width - radius, y);
      shape.lineTo(x + radius, y);
      shape.quadraticCurveTo(x, y, x, y + radius);
      return shape;
    }, [args, radius]);

    const geometry = useMemo(() => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: args[2],
        bevelEnabled: false,
        steps: smoothness,
      });
      geometry.center();
      return geometry;
    }, [shape, args, smoothness]);

    return (
      <mesh ref={ref} geometry={geometry} {...props}>
        <meshPhongMaterial color="#4d4c4a" />
      </mesh>
    );
  }
);

const AnswerBox = ({ children, onClick }) => {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);
  
    const handleClick = useCallback((event) => {
      event.stopPropagation();
      onClick();
    }, [onClick]);
  
    return (
      <group 
        onClick={handleClick} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[6 ,2.5,-7]} 
        rotation={[0,-1.5,0]}
      >
        <RoundedBox
          args={[2, 0.5, 0.1]}
          radius={0.05}
          smoothness={4}
        >
          <meshPhongMaterial color={hovered ? "#5d5c5a" : "#4d4c4a"} />
        </RoundedBox>
        <group position={[0, 0, 0.05 + 0.01]}>
          <Text
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {children}
          </Text>
        </group>
      </group>
    );
  };


export default AnswerBox;
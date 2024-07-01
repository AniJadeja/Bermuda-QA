import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useMemo } from "react";
import { Text } from "@react-three/drei";

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

const TextBox = ({
  children,
  position,
  fontSize,
  boxWidth = 3,
  boxHeight = 0.5,
  boxDepth = 0.1,
  radius = 0.05,
  smoothness = 4,
}) => {
  const { camera } = useThree();

  return (
    <group position={position}>
      <RoundedBox
        args={[boxWidth, boxHeight, boxDepth]}
        radius={radius}
        smoothness={smoothness}
      />
      <group position={[0, 0, boxDepth / 2 + 0.01]}>
        <Text
          fontSize={fontSize}
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

export default TextBox;

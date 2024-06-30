import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Hall = () => {
  const { scene } = useGLTF('/assets/Hall/Hall2.glb');

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene}  />
    </RigidBody>
  );
};

export default Hall;

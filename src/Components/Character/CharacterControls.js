// CharacterControls
import { Vector3 } from 'three';
import { useMobileScreen } from '../../Context/ScreenContext';

let CharacterRef = null;
let CurrentKey = null;



export const setCharacterRef = (ref) => {
    CharacterRef = ref;
};

export const moveCharacter = (x, y, z) => {
  if (CharacterRef) {
    const newPosition = new Vector3(x, y, z);
    cameraRef.position.copy(newPosition);
  }
};

export const getRotation = () => {

}


export const CharacterControls = () =>{
    
}

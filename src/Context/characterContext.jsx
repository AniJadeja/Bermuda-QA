import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const CharacterContext = createContext();

// Custom hook to use the Character Context
export const useCharacterState = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacterState must be used within a CharacterProvider"
    );
  }
  return context;
};

// CharacterProvider component
export const CharacterProvider = ({ children }) => {
  const [IS_CHARACTER_MOVABLE, setCharacterMovableState] = useState(true);
  const [isCharacterControllable, setCharacterControllable] = useState(true);

  const setCharacterMovable = useCallback(
    (movable) => {
      if (!isCharacterControllable) {
        throw new Error("Character control is not available.");
      }
      setCharacterMovableState(movable);
    },
    [isCharacterControllable]
  );

  return (
    <CharacterContext.Provider
      value={{
        IS_CHARACTER_MOVABLE,
        setCharacterMovable,
        isCharacterControllable,
        setCharacterControllable,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

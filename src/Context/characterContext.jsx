import React, { createContext, useContext, useState } from 'react';

// Create the context
const CharacterContext = createContext();

// Custom hook to use the Character Context
export const useCharacterState = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacterState must be used within a CharacterProvider');
    }
    return context;
};

// CharacterProvider component
export const CharacterProvider = ({ children }) => {
    const [IS_CHARACTER_MOVABLE, setCharacterMovable] = useState(false);

    return (
        <CharacterContext.Provider value={{ IS_CHARACTER_MOVABLE, setCharacterMovable }}>
            {children}
        </CharacterContext.Provider>
    );
};

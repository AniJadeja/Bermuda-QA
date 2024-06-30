import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ScreenContext = createContext();

// Custom hook to use the Screen Context
export const useMobileScreen = () => {
    return useContext(ScreenContext);
};

// ScreenProvider component
export const ScreenProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            const isMobileScreen = window.innerWidth <= 768;
            setIsMobile(isMobileScreen);
        };

        // Check on initial render
        checkScreenSize();

        // Add resize event listener
        window.addEventListener('resize', checkScreenSize);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <ScreenContext.Provider value={isMobile}>
            {children}
        </ScreenContext.Provider>
    );
};

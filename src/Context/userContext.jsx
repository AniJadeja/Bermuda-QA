import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserData = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [pname, setPname] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const getPname = () => {
            const pname = localStorage.getItem("pname");
            setPname(pname);
        };

        const getUser = () => {
            const user = localStorage.getItem("user");
            setUser(user);
        }

        getPname();
        getUser();

    }, []);

    return (
        <UserContext.Provider value={{ pname, user }}>
            {children}
        </UserContext.Provider>
    );
};

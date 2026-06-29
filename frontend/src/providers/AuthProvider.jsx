import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { datadogRum } from '@datadog/browser-rum';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        datadogRum.setUser(userData)
    };

    const logout = () => {
        setUser(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        datadogRum.clearUser()
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
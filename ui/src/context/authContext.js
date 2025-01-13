import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const validateToken = async () => {
        try{
            const res = await fetch("http://localhost:7001/api/auth/validateToken", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.valid) {
                setIsAuthenticated(true);
            }
        } catch (err) {
            console.error("Token validation error:", err);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    }

    
    useEffect(() => {
        
        validateToken();
        
        const interval = setInterval(() => {
            validateToken();
        }, 1000 * 60 * 5);
        
        return () => clearInterval(interval);
    }, []);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    return (
        <AuthContext value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext>
    );
};

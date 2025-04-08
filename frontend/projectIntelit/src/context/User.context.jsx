import React, { createContext, useEffect, useState } from "react";
import axios from "../config/axios.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const updateUser = (userData) => {
        setUser(userData);
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await axios.get("/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("User data:", response.data.user);
            
            setUser(response.data.user);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to fetch user data");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const clearUser = () => {
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        setUser,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateUser,
        clearUser,
        fetchUserData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
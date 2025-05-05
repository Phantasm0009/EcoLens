import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getUser, loginUser, logoutUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set up axios interceptor for authentication
    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Add token to all axios requests
        const interceptor = axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // Check if there's a stored token and fetch user data
        const fetchUser = async () => {
            if (token) {
                try {
                    const userData = await getUser();
                    setUser(userData);
                } catch (error) {
                    // If token is invalid or expired, clear it
                    console.error("Error loading user data:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        fetchUser();

        // Clean up interceptor on unmount
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            // Store token and user data
            localStorage.setItem('token', response.token);
            setUser(response.user);
            return response.user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Always clear token and user state on logout
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
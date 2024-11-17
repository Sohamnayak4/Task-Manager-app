// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, verifyToken } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await verifyToken(token);
          setIsAuthenticated(true);
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const data = await registerUser(email, password);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser(data.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check if user is logged in (e.g., check local storage or session)
      const token = localStorage.getItem('auth-token');
      if (token) {
        // You could verify the token here
        setUser({ token });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // Implement your login logic here
      const token = 'sample-token'; // Replace with actual token from your backend
      localStorage.setItem('auth-token', token);
      setUser({ token });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('auth-token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
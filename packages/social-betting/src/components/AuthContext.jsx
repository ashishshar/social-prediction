import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set authentication status (login/logout)
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

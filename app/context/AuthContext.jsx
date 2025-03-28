"use client"
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create Context
const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Check token on mount
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Login function
  const login = (token) => {
    Cookies.set("token", token, { expires: 1 }); // Save token in cookies for 1 day
    setToken(token);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);

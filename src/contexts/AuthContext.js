import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      const parsedCookie = JSON.parse(authCookie);
      setIsAuthenticated(true);
      setUser(parsedCookie);
      setEmail(parsedCookie.email);
    }
  }, []);

  const login = (teamName, email) => {
    const user = { teamName, email };
    Cookies.set("auth", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
    setEmail(email);
  };

  const logout = () => {
    Cookies.remove("auth");
    setIsAuthenticated(false);
    setUser(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, email, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

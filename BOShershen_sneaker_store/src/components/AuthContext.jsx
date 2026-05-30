import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username")
  );
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || [];
  });

  const login = (name) => {
    if (registeredUsers.includes(name)) {
      setUsername(name);
      localStorage.setItem("username", name);
      return true;
    }
    return false;
  };

  const register = (name) => {
    if (!registeredUsers.includes(name)) {
      const updated = [...registeredUsers, name];
      setRegisteredUsers(updated);
      localStorage.setItem("registeredUsers", JSON.stringify(updated));
      setUsername(name);
      localStorage.setItem("username", name);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

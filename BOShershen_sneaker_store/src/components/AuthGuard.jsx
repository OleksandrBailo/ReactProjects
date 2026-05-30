import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthGuard = ({ children }) => {
  const { username } = useAuth();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  if (username !== "Oleksandr") {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default AuthGuard;

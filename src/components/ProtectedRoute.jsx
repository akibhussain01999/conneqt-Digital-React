import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.checkAuth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/Header" replace />;
};

export default ProtectedRoute;

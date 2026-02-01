import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = useSelector((s) => s.auth.isAuth);

  if (!isAuth) return <Navigate to="/login" replace />;
  return <Outlet />;
}

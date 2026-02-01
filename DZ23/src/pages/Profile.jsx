import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s) => s.auth.user);
  const token = useSelector((s) => s.auth.token);

  const handleLogout = () => {
    dispatch(logout());               // удалит token из Redux и localStorage
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Profile</h1>

      <div style={{ marginTop: 12 }}>
        <div><b>Email:</b> {user?.email || "—"}</div>
        <div style={{ marginTop: 6 }}>
          <b>Token:</b> <code>{token || "—"}</code>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        style={{ marginTop: 20 }}
      >
        Logout
      </button>
    </div>
  );
}

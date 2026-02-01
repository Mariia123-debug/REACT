import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // DEMO-логика (в реальном проекте тут будет запрос на сервер)
    if (!email.trim() || !password.trim()) {
      setError("Введите email и пароль");
      return;
    }

    const fakeToken = "demo_token_" + Date.now();
    dispatch(
      loginSuccess({
        token: fakeToken,
        user: { email },
      })
    );

    navigate("/profile", { replace: true });
  };

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
          />
        </label>

        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}

        <button type="submit">Sign in</button>
      </form>

      <p style={{ marginTop: 16, opacity: 0.7 }}>
        Demo: любой email/пароль → впустит в Profile.
      </p>
    </div>
  );
}

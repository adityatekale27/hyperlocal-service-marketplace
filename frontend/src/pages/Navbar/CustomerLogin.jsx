import React, { useState } from "react";
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Form fields state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear fields when toggling
  const resetFields = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleToggle = (login) => {
    setIsLogin(login);
    resetFields();
  };

  // API endpoint URLs - replace with backend URLs
  const LOGIN_API = "/api/login";
  const SIGNUP_API = "/api/signup";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Example: save token to localStorage
        localStorage.setItem("token", data.token);
        // Redirect to home page
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple client-side password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="toggle-buttons">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => handleToggle(true)}
          disabled={loading}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => handleToggle(false)}
          disabled={loading}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <form className="form" onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <br /><hr /><br />

          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => alert("Forgot Password clicked!")}
            disabled={loading}
          >
            Forgot Password?
          </button>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      ) : (
        <form className="form" onSubmit={handleSignupSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default CustomerLogin;

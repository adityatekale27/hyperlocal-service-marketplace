import React, { useState } from "react";
import './ProviderLogin.css';

const ProviderLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Controlled inputs for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Controlled inputs for register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regServices, setRegServices] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // States for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Replace URL with your backend login API endpoint
      const res = await fetch("/api/provider/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Example: Save token to localStorage
      localStorage.setItem("providerToken", data.token);

      // Redirect to provider dashboard or homepage
      window.location.href = "/provider/home";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Replace URL with your backend register API endpoint
      const res = await fetch("/api/provider/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: regName,
          email: regEmail,
          phone: regPhone,
          services: regServices,
          password: regPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Example: Save token to localStorage
      localStorage.setItem("providerToken", data.token);

      // Redirect after successful registration
      window.location.href = "/provider/home";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="provider-container">
      <div className="toggle-section">
        <button
          className={isLogin ? "active-toggle" : ""}
          onClick={() => {
            setIsLogin(true);
            setError("");
          }}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active-toggle" : ""}
          onClick={() => {
            setIsLogin(false);
            setError("");
          }}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <form className="form-box" onSubmit={handleLoginSubmit}>
          <h2>Service Provider Login</h2>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your professional email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <br />
          <hr /><br /><br />

          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => alert("Forgot Password clicked!")}
            disabled={loading}
          >
            Forgot Password?
          </button>

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <form className="form-box" onSubmit={handleRegisterSubmit}>
          <h2>Join as a Partner</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            required
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
          />

          <label>Service(s) Provided</label>
          <input
            type="text"
            placeholder="e.g., Plumber, Electrician, Carpenter"
            required
            value={regServices}
            onChange={(e) => setRegServices(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            required
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
          />

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ProviderLogin;

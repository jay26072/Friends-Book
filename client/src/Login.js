import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import App from "./App";
// import crossIcon from "./assets/cross_icon.png"; // adjust this path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setError("");


    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const { data: response } = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        }
      );

      if (response.success) {
        localStorage.setItem("token", response.token);

        alert("Login successful!");
        // Optionally close popup
      } else {
        setError(response.message || "Login failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
          {/* <img
            src={crossIcon}
            alt="Close"
        
            className="close-btn"
          /> */}
        </div>

        <div className="login-popup-inputs">
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        
        </button>

        <p>
            {error && <span className="error">{error}</span>}
          <br />
          Don't have an account? <span>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;

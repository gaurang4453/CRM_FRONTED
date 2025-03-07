import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "/src/AxiosInstance";
import "../style/Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CementTruckAnimation from "../../Animation/CementTruckAnimation";  
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AxiosInstance.post("/login", {
        userName: username,
        password: password,
      });

      if (response.data.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onLoginSuccess();
        navigate("/home");
      } else {
        setError(
          response.data.message || "Incorrect username or password."
        );
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Login error:", err);
    }
  };
  return (
    <div className="login-container">
      <CementTruckAnimation />
      <div className="form-wrapper">
        <form className="form1" onSubmit={handleLogin}>
          <div className="header-text">
            <h2 className="h2">Login</h2>
          </div>
          
          <div className="mb-4 p-2 input-icon-wrapper">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="username"
              id="username"
              placeholder=""
              className="text_area input-with-icon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="input-icon">
              <i className="bi bi-person large-icon "></i>
            </span>
          </div>
          <div className="mb-4 p-2" style={{ position: "relative" }}>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder=""
              value={password}
              className="text_area"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              style={{ paddingRight: "30px", width: "100%" }}
            />
            <span className="input-icon">
              <i className="bi bi-lock large-icon"></i>
            </span>
          </div>

          <div className="input-group justify-content-center">
            <button type="submit" className="btn1">
              Login
            </button>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
/*
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "/src/AxiosInstance";
import "../style/Login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CementTruckAnimation from "../../Animation/CementTruckAnimation";
import bgVideo from "../../assets/bg_video.mov";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AxiosInstance.post("/login", {
        userName: username,
        password: password,
      });

      if (response.data.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        onLoginSuccess();
        navigate("/home");
      } else {
        setError(response.data.message || "Incorrect username or password.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CementTruckAnimation />
      <div className="form-wrapper">
        <form className="form1" onSubmit={handleLogin}>
          <div className="header-text">
            <h2 className="h2">Login</h2>
          </div>
          <div className="mb-4 p-2 input-icon-wrapper">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              className="text_area input-with-icon"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span className="input-icon">
              <i className="bi bi-person large-icon"></i>
            </span>
          </div>
          <div className="mb-4 p-2" style={{ position: "relative" }}>
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="text_area"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <span className="input-icon">
              <i className="bi bi-lock large-icon"></i>
            </span>
          </div>
          <div className="input-group justify-content-center">
            <button type="submit" className="btn1">Login</button>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
*/
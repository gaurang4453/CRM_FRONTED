import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "/src/AxiosInstance"; // Adjust path as needed
import "../style/Login.css";

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
          response.data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="content justify-content-center align-items-center body">
      <div className="col-md-12 form-container">
        <form className="mt-0" onSubmit={handleLogin}> {/* Added onSubmit */}
          <div className="header-text mb-4">
            <h2 className="h1">Login</h2>
          </div>
          <div className="mb-4 p-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              id="username"
              placeholder=""
              className="form-control form-control-lg bg-light fs-6 text_area"
              value={username} // Added value and onChange
              onChange={(e) => setUsername(e.target.value)}
              required //Added required.
            />
          </div>
          <div className="mb-4 p-2">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autocomplete="new-password" // Added autocomplete
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn1">
              Login
            </button>
          </div>
          {error && <div className="text-danger">{error}</div>} {/* Display error */}
        </form>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosInstance from "/src/AxiosInstance";
import { Container } from "react-bootstrap";

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
          response.data.message ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Login error:", err);
    }
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          height: "350px",
          width: "400px",
          borderRadius: "8px",
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <label htmlFor="username" style={{ position: "left", font: "icon" }}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            border: "none",
            borderBottom: "2px solid #007bff", // Change the color as needed
            outline: "none",
            boxShadow: "none",
            background: "transparent",
            paddingLeft: "0",
            width: "270px",
            height: "30px",
            
          }}
          onFocus={(e) => (e.target.style.borderBottom = "2px solid #0056b3")} // Change color when focused
          onBlur={(e) => (e.target.style.borderBottom = "2px solid #007bff")}
        />

        <label htmlFor="username" style={{ position: "left", font: "icon" }}>
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            border: "none",
            borderBottom: "2px solid #007bff", // Change the color as needed
            outline: "none",
            boxShadow: "none",
            background: "transparent",
            paddingLeft: "0",
            width: "270px",
            height: "30px",
          }}
          onFocus={(e) => (e.target.style.borderBottom = "2px solid #0056b3")} // Change color when focused
          onBlur={(e) => (e.target.style.borderBottom = "2px solid #007bff")}
        />

        <div>
          <button
            type="submit"
            style={{
              position: "justify",
              width: "300px",
              border: "none",
              borderRadius: "30px",
              height: "35px",
              backgroundColor: "#007bff",
              marginBottom: "-20px",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Login;

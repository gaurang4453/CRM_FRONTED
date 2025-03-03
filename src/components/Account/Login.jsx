import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosInstance from '/src/AxiosInstance';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await AxiosInstance.post('/login', {
        userName: username,
        password: password,
      });

      if (response.data.status === 1) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess();
        navigate('/home');
      } else {
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="container mt-5">
      {/* <div className="row justify-content-center"> */}
        <div className="col-md-12"> {/* Reduced col-md-12 to col-md-8, col-lg-6 */}
          <div className="card">
            <div className="card-header text-center font-weight-bold"><h1>login</h1></div>

            {error && <div className="alert alert-danger">{error}</div>}


            
            <div className="d-flex justify-content-center"> {/* Centered the form */}
              <form onSubmit={handleLogin} style={{ width: '80%' }}> {/* Increased width from 50% to 80% if needed */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Login;

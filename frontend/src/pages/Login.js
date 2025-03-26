<<<<<<< HEAD
import React, {useState} from 'react';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'q' && password === 'q') {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{width: '400px'}}>
                <div className="text-center mb-4">
                    <i className="bi bi-shield-lock-fill text-primary" style={{fontSize: '3rem'}}></i>
                    <h2 className="mt-2">Admin Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-person-fill"></i>
              </span>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-key-fill"></i>
              </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
=======
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/welcome');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="row w-100">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="login-card">
            <div className="card-body p-4">
              <h2 className="login-title">Welcome Back</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4 position-relative">
                  <div className="input-group">
                    <span className="input-group-text login-icon">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg login-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div className="mb-4 position-relative">
                  <div className="input-group">
                    <span className="input-group-text login-icon">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control form-control-lg login-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center login-alert" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3 login-button"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {loading ? 'Logging in...' : 'Sign In'}
                </button>

                <div className="text-center login-link-container">
                  <span>Don't have an account? </span>
                  <a href="/signup" className="login-link">
                    Sign Up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> 095f912e7db7c3f4026ea0ea198797694e33cf97
};

export default Login;
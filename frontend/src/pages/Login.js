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
};

export default Login;
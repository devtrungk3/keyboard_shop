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
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  User, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import './LoginPage.css';

/**
 * LoginPage Component
 * Requirement: "Protected Route (Basic)"
 * Provides simulated authentication guard so examiners can test protecting routes like /add-task.
 */
const LoginPage = () => {
  const { login, isAuthenticated, currentUser } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('saibadeep');
  const [password, setPassword] = useState('bca2026');

  // Destination route after login
  const from = location.state?.from?.pathname || '/add-task';

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate(from, { replace: true });
  };

  const handleQuickLogin = () => {
    login('saibadeep', 'bca2026');
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-card card-glass">
          {/* Header */}
          <div className="login-header">
            <div className="login-icon-box">
              <Lock size={28} />
            </div>
            <h1 className="login-title">Protected Route Authentication</h1>
            <p className="login-subtitle">
              Access to <code>{from}</code> requires an active session in accordance with Assignment 6.
            </p>
          </div>

          {/* Info callout */}
          <div className="login-demo-notice">
            <Info size={16} className="notice-icon" />
            <div className="notice-text">
              <strong>Protected Route (Basic) Gatekeeper:</strong>
              <p>
                Routes like <code>/add-task</code> use <code>&lt;ProtectedRoute&gt;</code> to verify user session tokens before granting access.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="login-username-input" className="form-label">
                <span>Username</span>
              </label>
              <div className="login-input-wrapper">
                <User size={16} className="login-input-icon" />
                <input
                  type="text"
                  id="login-username-input"
                  className="form-input login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password-input" className="form-label">
                <span>Password</span>
              </label>
              <div className="login-input-wrapper">
                <Key size={16} className="login-input-icon" />
                <input
                  type="password"
                  id="login-password-input"
                  className="form-input login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary login-submit-btn"
              id="submit-login-btn"
            >
              <span>Sign In & Continue</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="quick-demo-login-box">
            <span className="demo-divider-text">OR TEST INSTANTLY</span>
            <button
              type="button"
              className="btn btn-secondary demo-login-btn"
              onClick={handleQuickLogin}
              id="quick-demo-login-btn"
            >
              <Sparkles size={16} className="sparkle" />
              <span>One-Click Login as {currentUser.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

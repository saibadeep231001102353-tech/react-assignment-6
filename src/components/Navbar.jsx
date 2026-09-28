import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  CheckSquare, 
  LayoutDashboard, 
  ListTodo, 
  PlusCircle, 
  CheckCircle2, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import './Navbar.css';

/**
 * Navbar Component
 * Implements React Router NavLink elements with active indicator styles,
 * route protection status, and theme toggle.
 */
const Navbar = ({ theme, onToggleTheme }) => {
  const { isAuthenticated, logout, stats } = useTasks();
  const navigate = useNavigate();

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="taskflow-navbar">
      <div className="container nav-container">
        {/* Brand Group */}
        <NavLink to="/" className="brand-link">
          <div className="brand-logo-icon">
            <CheckSquare size={22} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title-row">
              <span className="brand-title">TaskFlow</span>
              <span className="brand-sub-badge">ROUTER</span>
            </div>
            <span className="brand-subline">Dynamic Routing & Task Management</span>
          </div>
        </NavLink>

        {/* Navigation Links using NavLink */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/tasks" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <ListTodo size={16} />
            <span>Tasks</span>
            {stats.total > 0 && (
              <span className="nav-badge-count">{stats.total}</span>
            )}
          </NavLink>

          <NavLink 
            to="/add-task" 
            className={({ isActive }) => `nav-item protected-nav-item ${isActive ? 'active' : ''}`}
            title="Protected Route (Requires Login)"
          >
            <PlusCircle size={16} />
            <span>Add Task</span>
            <Lock size={12} className="lock-mini-icon" />
          </NavLink>

          <NavLink 
            to="/completed" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <CheckCircle2 size={16} />
            <span>Completed</span>
            {stats.closed > 0 && (
              <span className="nav-badge-count count-green">{stats.closed}</span>
            )}
          </NavLink>
        </nav>

        {/* Actions & Session Bar */}
        <div className="nav-actions-group">
          {/* Assignment Tag */}
          <div className="assignment-chip">
            <span className="pulse-indicator"></span>
            <span>Assignment 6: Routing</span>
          </div>

          {/* Protected Route Auth Guard Toggle */}
          <button
            type="button"
            className={`auth-guard-btn ${isAuthenticated ? 'authenticated' : 'unauthenticated'}`}
            onClick={handleAuthToggle}
            title={isAuthenticated ? 'Logged In as Admin. Click to test route protection lock.' : 'Click to Login'}
          >
            {isAuthenticated ? (
              <>
                <ShieldCheck size={14} className="shield-icon" />
                <span className="auth-btn-text">Admin Active</span>
                <LogOut size={13} className="logout-icon" />
              </>
            ) : (
              <>
                <Lock size={14} />
                <span className="auth-btn-text">Sign In</span>
                <LogIn size={13} />
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

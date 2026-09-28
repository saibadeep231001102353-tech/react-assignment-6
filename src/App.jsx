import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import AddTaskPage from './pages/AddTaskPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import LoginPage from './pages/LoginPage';

import './App.css';

/**
 * Root Application Coordinator
 * React Practical Assignment 6: Task Manager with Routing
 * 
 * Features Demonstrated:
 * - React Router DOM (v6.28) HashRouter for GitHub Pages & static hosting compatibility
 * - 5 Required Pages: Dashboard, Tasks, Add Task, Task Details, Completed Tasks
 * - URL Parameters via /tasks/:taskId and useParams()
 * - Protected Route (Basic) via <ProtectedRoute>
 * - Navigation via <NavLink> and breadcrumbs
 */
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow_theme_pref') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow_theme_pref', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <TaskProvider>
      <HashRouter>
        <div className="taskflow-app-canvas">
          {/* Ambient Lighting Spheres */}
          <div className="ambient-sphere sphere-top-left"></div>
          <div className="ambient-sphere sphere-top-right"></div>

          {/* Persistent Navbar with NavLink & Auth Indicator */}
          <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

          {/* Main Routing View Area */}
          <main className="main-content-flow">
            <Routes>
              {/* Page 1: Dashboard Overview */}
              <Route path="/" element={<Dashboard />} />

              {/* Page 2: Tasks Full Catalog & Multi-Filter */}
              <Route path="/tasks" element={<TasksPage />} />

              {/* Page 3: Task Details (Requirement: URL Parameters via :taskId) */}
              <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />

              {/* Page 4: Add Task (Requirement: Protected Route Basic) */}
              <Route
                path="/add-task"
                element={
                  <ProtectedRoute>
                    <AddTaskPage />
                  </ProtectedRoute>
                }
              />

              {/* Page 5: Completed Tasks */}
              <Route path="/completed" element={<CompletedTasksPage />} />

              {/* Auth Gatekeeper for Protected Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Persistent Footer with Student Attribution */}
          <Footer />
        </div>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;

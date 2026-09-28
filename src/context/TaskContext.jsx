import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialTasks, getAutoRaisedDateTime } from '../data/initialTasks';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  // 1. Tasks state with localStorage persistence
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_tasks_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse tasks from localStorage:', e);
    }
    return initialTasks;
  });

  // 2. Authentication state for Protected Route (Basic)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('taskflow_auth') !== 'false'; // Default logged in for smooth preview
  });

  const [currentUser, setCurrentUser] = useState({
    name: 'Saibadeep Mullick',
    email: 'saibadeep.mullick@bca.edu',
    role: 'BCA 4th Year Student Admin'
  });

  // Sync tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('taskflow_tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to sync tasks to storage:', e);
    }
  }, [tasks]);

  // Sync auth state to localStorage
  useEffect(() => {
    localStorage.setItem('taskflow_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Auth Operations
  const login = (username, password) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Task Operations: CREATE (Add Task)
  const addTask = (taskInput) => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newTask = {
      ...taskInput,
      id: taskInput.id || `TSK-${randomSuffix}`,
      raisedDateTime: getAutoRaisedDateTime(), // Requirement: Automatically picked
      dueDate: taskInput.dueDate || '28 Aug 2026', // Requirement default
      status: taskInput.status || 'Raised'
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // Task Operations: UPDATE (Edit Task)
  const updateTask = (taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
  };

  // Task Operations: DELETE
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Task Operations: COMPLETE / TOGGLE STATUS
  const toggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === 'Closed' ? 'Pending' : 'Closed';
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  // Find task by ID (for Task Details page)
  const getTaskById = (taskId) => {
    return tasks.find((t) => t.id === taskId);
  };

  // Statistics & Metrics
  const stats = useMemo(() => {
    const total = tasks.length;
    const raised = tasks.filter((t) => t.status === 'Raised').length;
    const pending = tasks.filter((t) => t.status === 'Pending').length;
    const closed = tasks.filter((t) => t.status === 'Closed').length;
    const highPriority = tasks.filter((t) => t.priority === 'High' && t.status !== 'Closed').length;
    const completionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

    return {
      total,
      raised,
      pending,
      closed,
      highPriority,
      completionRate
    };
  }, [tasks]);

  const value = {
    tasks,
    stats,
    isAuthenticated,
    currentUser,
    login,
    logout,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    getTaskById
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}

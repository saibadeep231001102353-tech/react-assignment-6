import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  PlusCircle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import './Dashboard.css';

/**
 * Dashboard Page
 * Overview with stats ribbon, priority summary, and urgent pending task roster.
 */
const Dashboard = () => {
  const { tasks, stats } = useTasks();

  // High priority or urgent tasks
  const urgentTasks = tasks
    .filter((t) => t.priority === 'High' && t.status !== 'Closed')
    .slice(0, 3);

  // Recent tasks
  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-welcome-banner">
          <div className="welcome-text-group">
            <div className="welcome-chip">
              <Sparkles size={14} className="sparkle" />
              <span>BCA Academic & Personal Workflow Portal</span>
            </div>
            <h1 className="dashboard-main-title">
              Task Management <span className="gradient-text">Command Center</span>
            </h1>
            <p className="dashboard-subtext">
              Track lifecycle assignments, academic research, and personal milestones with React Router, 
              nested URL parameters, and protected routes.
            </p>
          </div>

          <div className="welcome-quick-actions">
            <Link to="/add-task" className="btn btn-primary add-task-action-btn">
              <PlusCircle size={18} />
              <span>Create New Task</span>
            </Link>
            <Link to="/tasks" className="btn btn-secondary view-tasks-action-btn">
              <ListTodo size={18} />
              <span>View All Tasks</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Metric Cards Ribbon */}
        <div className="dashboard-metrics-grid">
          {/* Stat 1: Total Tasks */}
          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-sky">
              <ListTodo size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{stats.total}</span>
              <span className="stat-lbl">Total Tasks</span>
            </div>
          </div>

          {/* Stat 2: Raised Tasks */}
          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-indigo">
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{stats.raised}</span>
              <span className="stat-lbl">Raised Status</span>
            </div>
          </div>

          {/* Stat 3: Pending Tasks */}
          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-amber">
              <TrendingUp size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{stats.pending}</span>
              <span className="stat-lbl">In Progress / Pending</span>
            </div>
          </div>

          {/* Stat 4: Completed Tasks */}
          <div className="stat-card card-glass">
            <div className="stat-icon-wrapper stat-emerald">
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-num">{stats.closed}</span>
              <span className="stat-lbl">Completed (Closed)</span>
            </div>
          </div>
        </div>

        {/* Completion Progress Bar Card */}
        <div className="completion-summary-card card-glass">
          <div className="completion-header-row">
            <div className="completion-title-group">
              <CheckCircle2 size={20} className="completion-icon" />
              <div>
                <h3 className="completion-title">Overall Task Completion Velocity</h3>
                <span className="completion-subtitle">
                  {stats.closed} of {stats.total} total tasks resolved to "Closed" status
                </span>
              </div>
            </div>
            <span className="completion-percentage">{stats.completionRate}%</span>
          </div>

          <div className="progress-track-bar">
            <div
              className="progress-fill-gradient"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Urgent High Priority Tasks */}
        {urgentTasks.length > 0 && (
          <section className="dashboard-section urgent-section">
            <div className="section-heading-bar">
              <div className="heading-left">
                <AlertTriangle size={18} className="urgent-icon" />
                <h2 className="section-title">Critical & High Priority Tasks</h2>
              </div>
              <Link to="/tasks" className="section-see-all-link">
                <span>View Filtered</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="tasks-cards-grid">
              {urgentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Activity Roster */}
        <section className="dashboard-section">
          <div className="section-heading-bar">
            <div className="heading-left">
              <Clock size={18} className="recent-icon" />
              <h2 className="section-title">Recently Raised & Tracked Tasks</h2>
            </div>
            <Link to="/tasks" className="section-see-all-link">
              <span>View Full Catalog ({stats.total})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="tasks-cards-grid">
            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

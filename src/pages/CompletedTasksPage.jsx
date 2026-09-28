import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  RotateCcw, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  Clock, 
  Award,
  ListTodo
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import './CompletedTasksPage.css';

/**
 * CompletedTasksPage Component
 * Requirement: "Pages: Completed Tasks"
 * Dedicated view showcasing all tasks marked with 'Closed' status.
 */
const CompletedTasksPage = () => {
  const { tasks, stats } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === 'Closed');

  return (
    <div className="completed-page">
      <div className="container">
        {/* Header Bar */}
        <div className="completed-header-bar">
          <div className="completed-title-block">
            <div className="completed-badge">
              <Award size={14} className="award-icon" />
              <span>Resolved Objectives</span>
            </div>
            <h1 className="completed-title">
              Completed <span className="gradient-text">Tasks</span>
            </h1>
            <p className="completed-subtitle">
              Review closed academic assignments, finished personal goals, and resolved action items.
            </p>
          </div>

          <div className="completion-kpi-card card-glass">
            <span className="kpi-value">{completedTasks.length} / {tasks.length}</span>
            <span className="kpi-label">Tasks Closed ({stats.completionRate}%)</span>
          </div>
        </div>

        {/* Content Grid or Empty View */}
        {completedTasks.length === 0 ? (
          <div className="empty-completed-card card-glass">
            <div className="empty-icon-circle">
              <CheckCircle2 size={44} />
            </div>
            <h3 className="empty-title">No Completed Tasks Yet</h3>
            <p className="empty-desc">
              You haven't marked any tasks as "Closed" yet. Visit the Tasks catalog and click 
              <strong> "Mark Complete"</strong> on any task to archive it here.
            </p>
            <Link to="/tasks" className="btn btn-primary">
              <ListTodo size={16} />
              <span>Browse Active Tasks</span>
            </Link>
          </div>
        ) : (
          <div className="tasks-grid">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedTasksPage;

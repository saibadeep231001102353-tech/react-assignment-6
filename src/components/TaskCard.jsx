import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  ExternalLink, 
  AlertCircle, 
  ArrowRight,
  Bookmark,
  Hash
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import './TaskCard.css';

/**
 * TaskCard Component
 * Displays a single task strictly showing all 7 required syllabus fields:
 * 1. Task Header
 * 2. Task Description
 * 3. Priority: High / Medium / Low
 * 4. Category: Academic / Personal
 * 5. Raised Date and Time: Automatically picked
 * 6. Due Date: e.g. 28 Aug 2026
 * 7. Status: Raised / Pending / Closed
 * Plus "View Details" linking to dynamic route `/tasks/:taskId`.
 */
const TaskCard = ({ task }) => {
  const { toggleComplete, deleteTask } = useTasks();

  const isClosed = task.status === 'Closed';

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Raised': return 'status-raised';
      case 'Pending': return 'status-pending';
      case 'Closed': return 'status-closed';
      default: return 'status-raised';
    }
  };

  return (
    <div className={`task-card card-glass ${isClosed ? 'task-completed-card' : ''}`} id={`task-card-${task.id}`}>
      {/* Top Header Row: Category, Priority, Status */}
      <div className="task-card-top-bar">
        <div className="tag-group">
          <span className="category-chip">
            <Bookmark size={12} />
            <span>{task.category}</span>
          </span>
          <span className={`priority-pill ${getPriorityClass(task.priority)}`}>
            {task.priority} Priority
          </span>
        </div>

        <span className={`status-pill ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>

      {/* Task ID and Header (Title) */}
      <div className="task-header-block">
        <span className="task-id-badge">
          <Hash size={11} />
          <code>{task.id}</code>
        </span>
        <h3 className="task-title-text" title={task.header}>
          <Link to={`/tasks/${task.id}`} className="task-title-link">
            {task.header}
          </Link>
        </h3>
      </div>

      {/* Task Description */}
      <p className="task-desc-text">{task.description}</p>

      {/* Timeline Meta (Raised Date/Time & Due Date) */}
      <div className="task-dates-grid">
        <div className="date-item" title="Raised Date and Time (Automatically Picked)">
          <Clock size={13} className="date-icon" />
          <div className="date-text">
            <span className="date-lbl">Raised:</span>
            <span className="date-val">{task.raisedDateTime}</span>
          </div>
        </div>

        <div className="date-item due-date-item" title="Task Due Date">
          <Calendar size={13} className="date-icon due-icon" />
          <div className="date-text">
            <span className="date-lbl">Due Date:</span>
            <strong className="date-val due-val">{task.dueDate}</strong>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="task-card-actions">
        {/* Toggle Complete / Reopen */}
        <button
          type="button"
          className={`action-btn-pill ${isClosed ? 'btn-reopen' : 'btn-complete'}`}
          onClick={() => toggleComplete(task.id)}
          title={isClosed ? 'Reopen task to Pending' : 'Mark task as Closed'}
          id={`toggle-complete-${task.id}`}
        >
          {isClosed ? (
            <>
              <RotateCcw size={14} />
              <span>Reopen Task</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={14} />
              <span>Mark Complete</span>
            </>
          )}
        </button>

        {/* View Details Link (Dynamic Route) */}
        <Link
          to={`/tasks/${task.id}`}
          className="details-link-btn"
          title={`View full details for ${task.id}`}
          id={`view-details-${task.id}`}
        >
          <span>Details</span>
          <ArrowRight size={14} />
        </Link>

        {/* Delete Task */}
        <button
          type="button"
          className="delete-task-icon-btn"
          onClick={() => deleteTask(task.id)}
          title="Delete task"
          aria-label={`Delete task ${task.id}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

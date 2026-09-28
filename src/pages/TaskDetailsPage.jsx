import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Bookmark, 
  Trash2, 
  Edit3, 
  Check, 
  RotateCcw, 
  CheckCircle2, 
  Hash, 
  Code2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from '../data/initialTasks';
import './TaskDetailsPage.css';

/**
 * TaskDetailsPage Component
 * Requirements strictly fulfilled:
 * - "Pages: Task Details"
 * - "Features: URL Parameters" -> extracts `taskId` using `useParams()` from React Router
 * - Update / Edit task details
 * - Status transition (Raised -> Pending -> Closed)
 * - Delete task
 */
const TaskDetailsPage = () => {
  // Extract dynamic route parameter
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleComplete } = useTasks();

  const task = getTaskById(taskId);

  // Inline editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(() => ({
    header: task?.header || '',
    description: task?.description || '',
    priority: task?.priority || 'High',
    category: task?.category || 'Academic',
    dueDate: task?.dueDate || '28 Aug 2026',
    status: task?.status || 'Raised'
  }));

  // Not Found State
  if (!task) {
    return (
      <div className="task-details-page">
        <div className="container">
          <div className="not-found-card card-glass">
            <div className="not-found-icon-box">
              <AlertCircle size={44} />
            </div>
            <h2 className="not-found-title">Task Record Not Found</h2>
            <p className="not-found-desc">
              No task with URL parameter identifier <code>"{taskId}"</code> could be located in the repository.
            </p>
            <div className="url-param-inspector">
              <Code2 size={16} />
              <span>React Router useParams(): <code>taskId = "{taskId}"</code></span>
            </div>
            <Link to="/tasks" className="btn btn-primary">
              <ArrowLeft size={16} />
              <span>Return to Tasks Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isClosed = task.status === 'Closed';

  const handleSaveEdit = (e) => {
    e.preventDefault();
    updateTask(task.id, editForm);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${task.header}"?`)) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div className="task-details-page">
      <div className="container">
        {/* Navigation Bar & URL Parameter Inspector */}
        <div className="details-nav-bar">
          <Link to="/tasks" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Tasks</span>
          </Link>

          {/* Explicit URL Parameter demonstration chip */}
          <div className="url-param-chip" title="React Router useParams() Dynamic Value">
            <Code2 size={14} className="code-icon" />
            <span>URL Parameter <code>:taskId</code> = <strong>{taskId}</strong></span>
          </div>
        </div>

        {/* Main Details Card */}
        <div className="details-container-card card-glass">
          {/* Header Action Bar */}
          <div className="details-card-header">
            <div className="header-meta-tags">
              <span className="task-id-pill">
                <Hash size={13} />
                <code>{task.id}</code>
              </span>
              <span className="category-chip">
                <Bookmark size={12} />
                <span>{task.category}</span>
              </span>
              <span className={`priority-pill priority-${task.priority.toLowerCase()}`}>
                {task.priority} Priority
              </span>
              <span className={`status-pill status-${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>

            <div className="details-top-actions">
              <button
                type="button"
                className={`btn-pill-action ${isClosed ? 'btn-pill-reopen' : 'btn-pill-complete'}`}
                onClick={() => toggleComplete(task.id)}
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

              <button
                type="button"
                className="btn-pill-action btn-pill-edit"
                onClick={() => {
                  setEditForm({
                    header: task.header,
                    description: task.description,
                    priority: task.priority,
                    category: task.category,
                    dueDate: task.dueDate,
                    status: task.status
                  });
                  setIsEditing(!isEditing);
                }}
              >
                <Edit3 size={14} />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Details'}</span>
              </button>

              <button
                type="button"
                className="btn-pill-action btn-pill-delete"
                onClick={handleDelete}
                title="Delete this task"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Details Content Body / Edit Mode */}
          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleSaveEdit} className="edit-task-form">
              <div className="form-group">
                <label className="form-label">Task Header (Title)</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.header}
                  onChange={(e) => setEditForm({ ...editForm, header: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Task Description</label>
                <textarea
                  rows="4"
                  className="form-textarea"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="edit-fields-row">
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={editForm.priority}
                    onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  >
                    {TASK_PRIORITIES.map((p) => (
                      <option key={p} value={p}>{p} Priority</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    {TASK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  >
                    {TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editForm.dueDate}
                    onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-actions-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Check size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            /* Standard View */
            <div className="details-body">
              <h1 className="details-task-header">{task.header}</h1>
              <p className="details-task-description">{task.description}</p>

              {/* All Required Fields Specification Grid */}
              <div className="details-spec-grid">
                {/* Field 1: Category */}
                <div className="spec-item card-glass-subtle">
                  <span className="spec-label">Category</span>
                  <strong className="spec-value">{task.category}</strong>
                </div>

                {/* Field 2: Priority */}
                <div className="spec-item card-glass-subtle">
                  <span className="spec-label">Priority Level</span>
                  <strong className="spec-value">{task.priority} Priority</strong>
                </div>

                {/* Field 3: Status */}
                <div className="spec-item card-glass-subtle">
                  <span className="spec-label">Current Status</span>
                  <strong className="spec-value">{task.status}</strong>
                </div>

                {/* Field 4: Raised Date and Time (Requirement: Automatically picked) */}
                <div className="spec-item card-glass-subtle">
                  <span className="spec-label">Raised Date & Time (Auto-Picked)</span>
                  <strong className="spec-value time-val">{task.raisedDateTime}</strong>
                </div>

                {/* Field 5: Due Date (Requirement: Due Date: 28 Aug 2026) */}
                <div className="spec-item card-glass-subtle">
                  <span className="spec-label">Due Date</span>
                  <strong className="spec-value due-val">{task.dueDate}</strong>
                </div>
              </div>

              {/* Status Quick Updater Bar */}
              <div className="status-updater-bar card-glass-subtle">
                <span className="updater-label">Update Task Lifecycle Status:</span>
                <div className="status-buttons-group">
                  {TASK_STATUSES.map((statusOption) => (
                    <button
                      key={statusOption}
                      type="button"
                      className={`status-switch-btn ${task.status === statusOption ? 'active' : ''}`}
                      onClick={() => updateTask(task.id, { status: statusOption })}
                    >
                      {statusOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Tag, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES, getAutoRaisedDateTime } from '../data/initialTasks';
import './AddTaskPage.css';

/**
 * AddTaskPage Component
 * Requirement: "Pages: Add Task" & "Protected Route (Basic)"
 * Protected form page allowing authenticated users to create a task with all 7 fields.
 */
const AddTaskPage = () => {
  const { addTask, currentUser } = useTasks();
  const navigate = useNavigate();

  // Controlled Form State
  const [formData, setFormData] = useState({
    header: '',
    description: '',
    priority: 'High',
    category: 'Academic',
    dueDate: '2026-08-28', // Requirement default: 28 Aug 2026
    status: 'Raised'
  });

  const [errors, setErrors] = useState({});
  const autoPickedDateTime = getAutoRaisedDateTime();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.header.trim()) {
      errs.header = 'Task Header (title) is required';
    } else if (formData.header.trim().length < 5) {
      errs.header = 'Header must be at least 5 characters long';
    }

    if (!formData.description.trim()) {
      errs.description = 'Task Description is required';
    }

    if (!formData.dueDate) {
      errs.dueDate = 'Due Date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Format human readable due date string (e.g. 28 Aug 2026)
    const dueObj = new Date(formData.dueDate);
    const formattedDue = isNaN(dueObj.getTime())
      ? formData.dueDate
      : dueObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newTask = addTask({
      ...formData,
      dueDate: formattedDue
    });

    // Navigate to tasks catalog or task details page
    navigate(`/tasks/${newTask.id}`);
  };

  return (
    <div className="add-task-page">
      <div className="container">
        {/* Breadcrumb & Navigation */}
        <div className="add-task-nav-bar">
          <Link to="/tasks" className="back-link">
            <ArrowLeft size={16} />
            <span>Back to Tasks Catalog</span>
          </Link>

          <div className="protected-route-badge">
            <ShieldCheck size={14} className="shield-active" />
            <span>Protected Route Session: {currentUser.name}</span>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="add-task-card card-glass">
          {/* Header */}
          <div className="add-task-header">
            <div className="add-header-icon-box">
              <PlusCircle size={24} />
            </div>
            <div className="add-header-text">
              <h1 className="add-page-title">
                Create New <span className="gradient-text">Task</span>
              </h1>
              <p className="add-page-desc">
                Fill in the official task metadata. All 7 syllabus fields are tracked and validated.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="task-form">
            {/* Field 1: Task Header */}
            <div className="form-group">
              <label htmlFor="task-header-input" className="form-label">
                <span>Task Header (Title)</span>
                <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="task-header-input"
                name="header"
                className={`form-input ${errors.header ? 'input-error' : ''}`}
                placeholder="e.g. Complete BCA Cloud Computing Research Paper"
                value={formData.header}
                onChange={handleChange}
              />
              {errors.header && <span className="field-error-msg">{errors.header}</span>}
            </div>

            {/* Field 2: Task Description */}
            <div className="form-group">
              <label htmlFor="task-desc-input" className="form-label">
                <span>Task Description</span>
                <span className="required-star">*</span>
              </label>
              <textarea
                id="task-desc-input"
                name="description"
                rows="4"
                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                placeholder="Provide detailed action items, objectives, and acceptance criteria..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <span className="field-error-msg">{errors.description}</span>}
            </div>

            {/* Field 3 & 4: Category & Priority */}
            <div className="form-grid-2col">
              {/* Category */}
              <div className="form-group">
                <label htmlFor="task-category-select" className="form-label">
                  <span>Category</span>
                </label>
                <select
                  id="task-category-select"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {TASK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label htmlFor="task-priority-select" className="form-label">
                  <span>Priority Level</span>
                </label>
                <select
                  id="task-priority-select"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {TASK_PRIORITIES.map((prio) => (
                    <option key={prio} value={prio}>{prio} Priority</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 5, 6 & 7: Raised Date/Time, Due Date, and Status */}
            <div className="form-grid-3col">
              {/* Field 5: Raised Date and Time (Requirement: Automatically picked) */}
              <div className="form-group">
                <label className="form-label">
                  <span>Raised Date & Time (Auto-Picked)</span>
                </label>
                <div className="auto-picked-display" title="Automatically timestamped upon creation">
                  <Clock size={16} className="auto-clock-icon" />
                  <span className="auto-picked-val">{autoPickedDateTime}</span>
                </div>
                <span className="field-hint">Captured from system clock automatically</span>
              </div>

              {/* Field 6: Due Date (Requirement: Due Date: 28 Aug 2026) */}
              <div className="form-group">
                <label htmlFor="task-due-date-input" className="form-label">
                  <span>Due Date</span>
                  <span className="required-star">*</span>
                </label>
                <input
                  type="date"
                  id="task-due-date-input"
                  name="dueDate"
                  className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                  value={formData.dueDate}
                  onChange={handleChange}
                />
                {errors.dueDate && <span className="field-error-msg">{errors.dueDate}</span>}
              </div>

              {/* Field 7: Status (Requirement: Raised / Pending / Closed) */}
              <div className="form-group">
                <label htmlFor="task-status-select" className="form-label">
                  <span>Initial Status</span>
                </label>
                <select
                  id="task-status-select"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {TASK_STATUSES.map((stat) => (
                    <option key={stat} value={stat}>{stat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Action */}
            <div className="form-actions-bar">
              <Link to="/tasks" className="btn btn-secondary">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary submit-task-btn"
                id="submit-create-task-btn"
              >
                <PlusCircle size={16} />
                <span>Save & Create Task</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;

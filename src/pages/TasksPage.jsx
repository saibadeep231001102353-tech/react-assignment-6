import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  RotateCcw, 
  ListTodo, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  Inbox
} from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from '../data/initialTasks';
import TaskCard from '../components/TaskCard';
import './TasksPage.css';

/**
 * TasksPage Component
 * Requirement: "Pages: Tasks" & "Filter tasks"
 * Full task roster with multi-faceted filtering by Category, Priority, Status, and Search keywords.
 */
const TasksPage = () => {
  const { tasks } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter Pipeline
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // 1. Category Filter
      if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;

      // 2. Priority Filter
      if (selectedPriority !== 'All' && t.priority !== selectedPriority) return false;

      // 3. Status Filter
      if (selectedStatus !== 'All' && t.status !== selectedStatus) return false;

      // 4. Search Query Filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        t.header.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.priority.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
    });
  }, [tasks, selectedCategory, selectedPriority, selectedStatus, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
  };

  const isFiltered =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="tasks-page">
      <div className="container">
        {/* Page Top Header Bar */}
        <div className="tasks-header-bar">
          <div className="tasks-title-group">
            <h1 className="tasks-main-heading">
              Task <span className="gradient-text">Repository</span>
            </h1>
            <span className="tasks-count-pill">
              Showing {filteredTasks.length} of {tasks.length} Total Tasks
            </span>
          </div>

          <Link to="/add-task" className="btn btn-primary create-task-btn" id="tasks-add-new-btn">
            <PlusCircle size={16} />
            <span>Create New Task</span>
          </Link>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="tasks-filter-card card-glass">
          {/* Row 1: Search input */}
          <div className="search-bar-row">
            <div className="search-input-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input-field"
                placeholder="Search tasks by header, description, ID (e.g. TSK-101)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="tasks-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-cross"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category, Priority, and Status Selectors */}
          <div className="filter-dropdowns-row">
            {/* Category Filter */}
            <div className="filter-item">
              <label htmlFor="cat-filter-select" className="filter-lbl">Category:</label>
              <select
                id="cat-filter-select"
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {TASK_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Priority Filter */}
            <div className="filter-item">
              <label htmlFor="prio-filter-select" className="filter-lbl">Priority:</label>
              <select
                id="prio-filter-select"
                className="filter-select"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="All">All Priorities</option>
                {TASK_PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p} Priority</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="filter-item">
              <label htmlFor="status-filter-select" className="filter-lbl">Status:</label>
              <select
                id="status-filter-select"
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                {TASK_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={handleResetFilters}
                title="Reset all search queries and filters"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Task Cards Grid or Empty State */}
        {filteredTasks.length === 0 ? (
          <div className="empty-tasks-card card-glass">
            <div className="empty-icon-circle">
              <Inbox size={44} />
            </div>
            <h3 className="empty-title">No Matching Tasks Found</h3>
            <p className="empty-desc">
              No tasks matched your active filter parameters.
              Try adjusting your category, priority, status criteria or create a new task.
            </p>
            <div className="empty-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleResetFilters}
              >
                Reset All Filters
              </button>
              <Link to="/add-task" className="btn btn-primary">
                <PlusCircle size={16} />
                <span>Add Task Now</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;

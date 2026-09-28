import React from 'react';
import { 
  CheckSquare, 
  GraduationCap, 
  CheckCircle2, 
  Route, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Displays technical assignment metadata, concepts demonstrated, and student credits.
 * Credits: Saibadeep Mullick, 4th Year BCA Student.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="taskflow-footer">
      <div className="container footer-container">
        {/* Top Info Grid */}
        <div className="footer-grid">
          {/* Brand & Purpose Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <CheckSquare size={22} />
              </div>
              <span className="footer-brand-title">TaskFlow</span>
            </div>
            <p className="footer-description">
              Single-page Task Management Application built for React Practical Assignment 6.
              Engineered with <code>react-router-dom</code> for dynamic page routing, nested paths, 
              URL parameter extraction via <code>useParams()</code>, and basic protected route gatekeeping.
            </p>
            <div className="academic-badge">
              <GraduationCap size={15} />
              <span>Bachelor of Computer Applications (BCA) - 4th Year</span>
            </div>
          </div>

          {/* Concepts Demonstrated Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Assignment 6 Concepts</h4>
            <ul className="footer-list">
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><code>react-router-dom</code> SPA client-side routing architecture</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><strong>URL Parameters</strong>: Dynamic <code>/tasks/:taskId</code> via <code>useParams()</code></span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><strong>Protected Route (Basic)</strong>: <code>&lt;ProtectedRoute&gt;</code> auth guard</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Navigation using <code>&lt;NavLink&gt;</code> with active route indicators</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Complete Task CRUD: Create, View, Update, Filter, and Delete</span>
              </li>
            </ul>
          </div>

          {/* Syllabus Compliance Checklist */}
          <div className="footer-col">
            <h4 className="footer-heading">5 Required Pages & Fields</h4>
            <div className="feature-tags-grid">
              <span className="feature-tag verified">✓ Dashboard Page (/)</span>
              <span className="feature-tag verified">✓ Tasks Page (/tasks)</span>
              <span className="feature-tag verified">✓ Add Task Page (/add-task) [Protected]</span>
              <span className="feature-tag verified">✓ Task Details (/tasks/:taskId) [URL Param]</span>
              <span className="feature-tag verified">✓ Completed Tasks (/completed)</span>
              <span className="feature-tag verified">✓ Raised Date/Time (Auto-Picked)</span>
              <span className="feature-tag verified">✓ Due Date: 28 Aug 2026</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Credits Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} TaskFlow Systems. Built for React Practical Assignment 6.
          </p>

          <div className="developer-badge">
            <span className="badge-label">Developed by:</span>
            <span className="dev-name">Saibadeep Mullick</span>
            <span className="dev-dept">BCA 4th Year</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

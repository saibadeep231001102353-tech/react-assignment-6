# Assignment 6: TaskFlow - React Router Multi-Page Task Manager

A multi-page task management web application demonstrating React Router DOM v6 navigation, URL parameters, protected routes, and centralized context state.

---

## 📌 Features & Highlights

- **Multi-Page Client-Side Routing**:
  - `/` - **Dashboard**: Analytics metrics, completion rate gauges, recent tasks, and priority distribution.
  - `/tasks` - **Task Catalog**: Comprehensive task listing with search, category filtering, and status filters.
  - `/tasks/:taskId` - **Task Details**: Dynamic routing via URL parameters reading task ID and details.
  - `/add-task` - **Protected Creation Form**: Gatekeeper protected route requiring simulated authentication.
  - `/completed` - **Completed Archive**: Dedicated archive view for finished tasks.
  - `/login` - **Authentication Page**: Fast login toggle for demonstration.
- **Static Hosting Compatible**: Configured with `HashRouter` ensuring clean navigation and refresh on GitHub Pages without 404 errors.
- **GitHub Actions Deployment**: Automatic CI/CD pipeline building and publishing to GitHub Pages on every push.

---

## 🛠️ Tech Stack

- **React 19**
- **React Router DOM v6**
- **Vite**
- **Lucide React Icons**
- **CSS3 Design System & Theme Engine**

---

## ⚡ Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

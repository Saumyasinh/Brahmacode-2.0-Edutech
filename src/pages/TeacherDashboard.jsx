import React, { useState, useEffect } from 'react'
import '../styles/TeacherDashboard.css'

export default function TeacherDashboard({ teacherName, onLogout }) {
  const [dashboardData] = useState({
    teacherName: teacherName || 'John Doe',
    teacherId: 'T001',
    performance: 82,
    classes: [
      { id: 1, name: 'Grade 10 - Mathematics', students: 32, icon: '📐' },
      { id: 2, name: 'Grade 11 - Physics', students: 28, icon: '⚛️' },
      { id: 3, name: 'Grade 9 - English', students: 35, icon: '📖' },
      { id: 4, name: 'Grade 12 - Chemistry', students: 47, icon: '🧪' }
    ],
    assignments: [
      { id: 1, title: 'Chapter 5: Quadratic Equations', className: 'Grade 10 - Mathematics', dueDate: '2026-02-12', status: 'pending', submitted: 12, total: 32 },
      { id: 2, title: 'Forces and Motion Lab Report', className: 'Grade 11 - Physics', dueDate: '2026-02-11', status: 'submitted', submitted: 25, total: 28 },
      { id: 3, title: 'Essay: Shakespeare\'s Sonnets', className: 'Grade 9 - English', dueDate: '2026-02-15', status: 'graded', submitted: 35, total: 35 },
      { id: 4, title: 'Periodic Table Assignment', className: 'Grade 12 - Chemistry', dueDate: '2026-02-10', status: 'pending', submitted: 8, total: 47 }
    ],
    metrics: {
      attendance: 87,
      completion: 76,
      classPerformance: 82
    }
  })

  const [activeNav, setActiveNav] = useState('home')

  const handleNavClick = (navItem) => {
    setActiveNav(navItem)
    if (navItem !== 'home') {
      alert(`${navItem.charAt(0).toUpperCase() + navItem.slice(1)} section coming soon!`)
    }
  }

  const handleLogoutClick = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
    }
  }

  return (
    <div className="teacher-dashboard-container">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="teacher-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">P</div>
          <span>AssessMate</span>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <span className="nav-icon">🏠</span>
              <span>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'classes' ? 'active' : ''}`}
              onClick={() => handleNavClick('classes')}
            >
              <span className="nav-icon">📚</span>
              <span>My Classes</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'assignments' ? 'active' : ''}`}
              onClick={() => handleNavClick('assignments')}
            >
              <span className="nav-icon">📝</span>
              <span>Assignments</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'analytics' ? 'active' : ''}`}
              onClick={() => handleNavClick('analytics')}
            >
              <span className="nav-icon">📊</span>
              <span>Analytics</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'messages' ? 'active' : ''}`}
              onClick={() => handleNavClick('messages')}
            >
              <span className="nav-icon">💬</span>
              <span>Messages</span>
            </a>
          </li>
        </ul>

        <a className="nav-link logout-btn" onClick={handleLogoutClick}>
          <span className="nav-icon">🚪</span>
          <span>Logout</span>
        </a>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="teacher-main-content">
        {/* TOP HEADER */}
        <header className="teacher-header">
          <div className="header-title">Dashboard</div>
          <div className="header-right">
            <div className="class-performance-badge">
              <span className="badge-indicator"></span>
              <span>Class Performance: <span id="badge-performance">{dashboardData.metrics.classPerformance}</span>%</span>
            </div>

            <div className="notification-bell">
              🔔
              <span className="notification-dot"></span>
            </div>

            <div className="teacher-profile">
              <div className="teacher-avatar">
                {dashboardData.teacherName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="teacher-info">
                <div className="teacher-name">{dashboardData.teacherName}</div>
                <div className="teacher-role">Teacher</div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="teacher-dashboard">
          {/* WELCOME HERO CARD */}
          <div className="welcome-card">
            <div className="welcome-content">
              <h1>Welcome back, {dashboardData.teacherName.split(' ')[0]}!</h1>
              <p>Ready to manage today's classes?</p>
              <button className="btn btn-primary" onClick={() => alert('Create Assignment form would open here')}>Create Assignment</button>
            </div>
            <div className="welcome-decoration">📚</div>
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="dashboard-grid">
            {/* MY CLASSES CARD */}
            <div className="card">
              <div className="card-title">
                <span className="card-title-icon">📚</span>
                My Classes
              </div>
              <div className="classes-container">
                {dashboardData.classes.map(cls => (
                  <div key={cls.id} className="class-item">
                    <div className="class-info">
                      <div className="class-icon">{cls.icon}</div>
                      <div className="class-details">
                        <div className="class-name">{cls.name}</div>
                        <div className="class-meta">{cls.students} students</div>
                      </div>
                    </div>
                    <div className="class-actions">
                      <button className="btn-small" onClick={() => alert('Viewing class details...')}>View</button>
                      <button className="btn-small" onClick={() => alert('Taking attendance...')}>Attendance</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="class-stats">
                <div className="stat-mini">
                  <div className="stat-value">{dashboardData.classes.length}</div>
                  <div className="stat-label">Total Classes</div>
                </div>
                <div className="stat-mini">
                  <div className="stat-value">{dashboardData.classes.reduce((sum, c) => sum + c.students, 0)}</div>
                  <div className="stat-label">Students Enrolled</div>
                </div>
              </div>
            </div>

            {/* ANALYTICS CARD */}
            <div className="card">
              <div className="card-title">
                <span className="card-title-icon">📊</span>
                Analytics
              </div>
              <div className="chart-container">
                <div className="chart-placeholder"><img src="/assets/assessmate-logo.png" alt="AssessMate" style={{width:36, height:36, objectFit:'contain'}}/></div>
                <div className="chart-label">Performance Overview</div>
              </div>
              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-value">{dashboardData.metrics.attendance}%</div>
                  <div className="metric-label">Avg Attendance</div>
                </div>
                <div className="metric-item">
                  <div className="metric-value">{dashboardData.metrics.completion}%</div>
                  <div className="metric-label">Assignment Completion</div>
                </div>
              </div>
            </div>

            {/* ASSIGNMENTS CARD (FULL WIDTH) */}
            <div className="card full-width">
              <div className="card-title">
                <span className="card-title-icon">📝</span>
                Recent Assignments
              </div>
              <div className="assignments-list">
                {dashboardData.assignments.map(assignment => (
                  <div key={assignment.id} className="assignment-item">
                    <div className="assignment-info">
                      <div className="assignment-title">{assignment.title}</div>
                      <div className="assignment-meta">{assignment.className} • Due: {assignment.dueDate} • {assignment.submitted}/{assignment.total} submitted</div>
                    </div>
                    <span className={`status-badge status-${assignment.status}`}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
              <button className="create-assignment-btn" onClick={() => alert('Create Assignment form would open here')}>+ Create New Assignment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import '../styles/StudentDashboard.css'

export default function StudentDashboard({ studentName, onLogout }) {
  // Dashboard data
  const [dashboardData] = useState({
    studentName: studentName || 'Aryan Patel',
    questions: 1250,
    accuracy: 85,
    readiness: 68,
    weakestSubject: 'Physics',
    predictedScore: 32,
    maxScore: 50,
  })

  const [activeNav, setActiveNav] = useState('home')

  const recentAttempts = [
    {
      id: 1,
      subject: 'Physics',
      topic: 'Motion',
      score: '8/10',
      date: 'Apr 24, 2024',
      status: null
    },
    {
      id: 2,
      subject: 'Maths',
      topic: 'Trigonometry',
      score: '6/10',
      date: 'Apr 23, 2024',
      status: 'Weak'
    },
    {
      id: 3,
      subject: 'Chemistry',
      topic: 'Acids & Bases',
      score: '9/10',
      date: 'Apr 23, 2024',
      status: 'Excellent'
    }
  ]

  const handleNavClick = (navItem) => {
    setActiveNav(navItem)
  }

  const handleLogoutClick = (e) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
    }
  }

  return (
    <div className="student-dashboard-container">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="student-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">P</div>
          <span>PrepSense</span>
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
              className={`nav-link ${activeNav === 'quiz' ? 'active' : ''}`}
              onClick={() => handleNavClick('quiz')}
            >
              <span className="nav-icon">📝</span>
              <span>Practice Quiz</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'progress' ? 'active' : ''}`}
              onClick={() => handleNavClick('progress')}
            >
              <span className="nav-icon">📊</span>
              <span>Progress Report</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeNav === 'weak' ? 'active' : ''}`}
              onClick={() => handleNavClick('weak')}
            >
              <span className="nav-icon">⚠️</span>
              <span>Weak Topics</span>
            </a>
          </li>
        </ul>

        <a className="nav-link logout-btn" onClick={handleLogoutClick}>
          <span className="nav-icon">🚪</span>
          <span>Logout</span>
        </a>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="student-main-content">
        {/* TOP HEADER */}
        <header className="student-header">
          <div className="header-title">Dashboard</div>
          <div className="header-right">
            <div className="exam-readiness-badge">
              <span className="badge-indicator"></span>
              <span>Exam Readiness: <span id="badge-readiness">{dashboardData.readiness}</span>%</span>
            </div>

            <div className="notification-bell">
              🔔
              <span className="notification-dot"></span>
            </div>

            <div className="student-profile">
              <div className="student-avatar">
                {dashboardData.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="student-info">
                <div className="student-name">{dashboardData.studentName}</div>
                <div className="student-role">Student</div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="student-dashboard">
          {/* WELCOME HERO CARD */}
          <div className="welcome-card">
            <div className="welcome-content">
              <h1>Welcome back, {dashboardData.studentName.split(' ')[0]}!</h1>
              <p>Ready for your next quiz?</p>
              <button className="btn btn-primary">Continue Practice</button>
            </div>
            <div className="welcome-decoration">🎯</div>
          </div>

          {/* MAIN GRID LAYOUT */}
          <div className="dashboard-grid">
            {/* LEFT COLUMN: STATISTICS */}
            <div className="left-column">
              {/* STATISTICS GRID (4 CARDS) */}
              <div className="stats-grid">
                {/* Card 1: Questions Practiced */}
                <div className="stat-card accent-yellow">
                  <div className="stat-icon">📚</div>
                  <div className="stat-label">Questions Practiced</div>
                  <div className="stat-value">{dashboardData.questions.toLocaleString()}</div>
                </div>

                {/* Card 2: Overall Accuracy */}
                <div className="stat-card accent-blue">
                  <div className="stat-icon">✅</div>
                  <div className="stat-label">Overall Accuracy</div>
                  <div className="stat-value">{dashboardData.accuracy}%</div>
                </div>

                {/* Card 3: Weakest Subject */}
                <div className="stat-card accent-orange">
                  <div className="stat-icon">📖</div>
                  <div className="stat-label">Weakest Subject</div>
                  <div className="stat-value" style={{ fontSize: '20px' }}>
                    {dashboardData.weakestSubject}
                  </div>
                </div>

                {/* Card 4: Predicted Score */}
                <div className="stat-card accent-red">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-label">Predicted Score</div>
                  <div className="stat-value">
                    {dashboardData.predictedScore}/{dashboardData.maxScore}
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(dashboardData.predictedScore / dashboardData.maxScore) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: EXAM READINESS */}
            <div className="right-column">
              {/* EXAM READINESS CARD */}
              <div className="exam-readiness-card">
                <div className="circular-progress-container">
                  <div className="circular-progress">
                    <div
                      className="progress-circle"
                      style={{
                        background: `conic-gradient(
                          var(--accent-yellow) 0deg,
                          var(--accent-yellow) ${dashboardData.readiness * 3.6}deg,
                          #e5e5e5 ${dashboardData.readiness * 3.6}deg,
                          #e5e5e5 360deg
                        )`
                      }}
                    ></div>
                    <div className="progress-text">
                      <div className="progress-percentage">{dashboardData.readiness}%</div>
                      <div className="progress-label">Exam Readiness</div>
                    </div>
                  </div>
                </div>

                <div className="readiness-status">⚠️ Needs Revision</div>
                <div className="readiness-helper">Reach 80% to be ready!</div>
              </div>
            </div>

            {/* RECENT ATTEMPTS TABLE (FULL WIDTH) */}
            <div className="recent-attempts">
              <h2>Recent Attempts</h2>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Topic</th>
                      <th>Score</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td>{attempt.subject}</td>
                        <td>{attempt.topic}</td>
                        <td className="score-cell">{attempt.score}</td>
                        <td>{attempt.date}</td>
                        <td>
                          {attempt.status && (
                            <span
                              className={`tag ${
                                attempt.status === 'Weak'
                                  ? 'weak'
                                  : 'excellent'
                              }`}
                            >
                              {attempt.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'

export default function Dashboard({ role, onLogout }) {
  const [parentName, setParentName] = useState('')

  useEffect(() => {
    if (role === 'parent') {
      const currentParent = JSON.parse(localStorage.getItem('currentParent') || '{}')
      if (currentParent.fullName) {
        setParentName(currentParent.fullName)
      }
    }
  }, [role])
  const roleLabels = {
    student: 'Student',
    teacher: 'Teacher',
    parent: 'Parent'
  }

  const getDashboardContent = () => {
    switch(role) {
      case 'student':
        return (
          <>
            <div className="welcome-message">
              Welcome, Student! Here's your dashboard.
            </div>
            <div className="dashboard-card">
              <h2>📚 Your Courses</h2>
              <p>View and manage all your enrolled courses. Access course materials, assignments, and grades.</p>
            </div>
            <div className="dashboard-card">
              <h2>📝 Assignments</h2>
              <p>Check your pending assignments and submit your work. Track submission deadlines and grades.</p>
            </div>
            <div className="dashboard-card">
              <h2>📊 Performance</h2>
              <p>View your academic performance, progress reports, and get AI-powered study recommendations.</p>
            </div>
          </>
        )
      case 'teacher':
        return (
          <>
            <div className="welcome-message">
              Welcome, Teacher! Here's your dashboard.
            </div>
            <div className="dashboard-card">
              <h2>👥 My Classes</h2>
              <p>Manage your classes, view student lists, and track class performance metrics.</p>
            </div>
            <div className="dashboard-card">
              <h2>📋 Assignments</h2>
              <p>Create and manage assignments. Grade student submissions and provide feedback.</p>
            </div>
            <div className="dashboard-card">
              <h2>📈 Analytics</h2>
              <p>Analyze student performance, identify learning gaps, and get AI insights for teaching optimization.</p>
            </div>
          </>
        )
      case 'parent':
        return (
          <>
            <div className="welcome-message">
              Welcome, {parentName}! Here's your dashboard.
            </div>
            <div className="dashboard-card">
              <h2>👨‍👧‍👦 My Children's Progress</h2>
              <p>Monitor your children's academic progress, course enrollment, and performance trends.</p>
            </div>
            <div className="dashboard-card">
              <h2>📞 Communication</h2>
              <p>Connect with teachers, receive updates about your child's performance, and stay involved.</p>
            </div>
            <div className="dashboard-card">
              <h2>🎯 Performance Reports</h2>
              <p>Get detailed reports on your child's strengths, areas for improvement, and learning insights.</p>
            </div>
          </>
        )
      default:
        return <div>Welcome to PrepSense AI</div>
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">PrepSense AI - {roleLabels[role]} Dashboard</h1>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </header>
      <div className="dashboard-content">
        {getDashboardContent()}
      </div>
    </div>
  )
}

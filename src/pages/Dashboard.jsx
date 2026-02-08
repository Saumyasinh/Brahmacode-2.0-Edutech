import React, { useEffect, useState } from 'react'
import StudentDashboard from './StudentDashboard'
import TeacherDashboard from './TeacherDashboard'

export default function Dashboard({ role, onLogout }) {
  const [parentName, setParentName] = useState('')
  const [studentName, setStudentName] = useState('Aryan Patel')
  const [teacherName, setTeacherName] = useState('John Doe')

  useEffect(() => {
    if (role === 'parent') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      if (currentUser.studentName) {
        setParentName(currentUser.studentName)
      }
    } else if (role === 'student') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      if (currentUser.studentName) {
        setStudentName(currentUser.studentName)
      }
    } else if (role === 'teacher') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      if (currentUser.teacherName) {
        setTeacherName(currentUser.teacherName)
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
        return <StudentDashboard studentName={studentName} onLogout={onLogout} />
      case 'teacher':
        return <TeacherDashboard teacherName={teacherName} onLogout={onLogout} />
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
        return <div>Welcome to AssessMate</div>
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">AssessMate - {roleLabels[role]} Dashboard</h1>
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

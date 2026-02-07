import { useState, useEffect } from 'react'
import './App.css'
import RoleSelection from './pages/RoleSelection'
import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import ParentLogin from './pages/ParentLogin'
import ParentSignup from './pages/ParentSignup'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('roleSelection')
  const [userRole, setUserRole] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Initialize demo accounts and restore session on app load
  useEffect(() => {
    initializeDemoAccounts()
    restoreSession()
  }, [])

  const restoreSession = () => {
    const role = localStorage.getItem('role')
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    
    if (role && currentUser && ['student', 'teacher', 'parent'].includes(role)) {
      setUserRole(role)
      setIsLoggedIn(true)
      setCurrentPage('dashboard')
    }
  }

  const initializeDemoAccounts = () => {
    // Check if demo data already exists
    if (localStorage.getItem('demoDataInitialized')) {
      return
    }

    // Initialize demo student accounts
    const studentAccounts = [
      { studentId: 'S001', fullName: 'Aryan Patel', password: 'password123' },
      { studentId: 'S002', fullName: 'Sarah Johnson', password: 'password123' },
      { studentId: 'S003', fullName: 'Rahul Kumar', password: 'password123' }
    ]
    localStorage.setItem('studentAccounts', JSON.stringify(studentAccounts))

    // Initialize demo teacher accounts
    const teacherAccounts = [
      { teacherId: 'T001', fullName: 'John Doe', password: 'password123' },
      { teacherId: 'T002', fullName: 'Emily Smith', password: 'password123' },
      { teacherId: 'T003', fullName: 'Dr. Michael Brown', password: 'password123' }
    ]
    localStorage.setItem('teacherAccounts', JSON.stringify(teacherAccounts))

    // Initialize demo attempts for students
    studentAccounts.forEach(student => {
      const attemptsKey = `attempts_${student.studentId}`
      const attempts = [
        { subject: 'Physics', topic: 'Motion', score: 8, outOf: 10, date: '2026-02-05' },
        { subject: 'Maths', topic: 'Trigonometry', score: 6, outOf: 10, date: '2026-02-03' },
        { subject: 'Chemistry', topic: 'Acids & Bases', score: 9, outOf: 10, date: '2026-02-01' }
      ]
      localStorage.setItem(attemptsKey, JSON.stringify(attempts))
    })

    // Mark demo data as initialized
    localStorage.setItem('demoDataInitialized', 'true')
  }

  const handleRoleSelect = (role) => {
    setUserRole(role)
    setCurrentPage(`${role}Login`)
  }

  const handleLogin = (role) => {
    setUserRole(role)
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    // Clear all user session data
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    localStorage.removeItem('currentParent')
    localStorage.removeItem('studentData')
    
    setIsLoggedIn(false)
    setUserRole(null)
    setCurrentPage('roleSelection')
  }

  const handleBackToRoles = () => {
    setCurrentPage('roleSelection')
    setUserRole(null)
  }

  const handleNavigateToParentSignup = () => {
    setCurrentPage('parentSignup')
  }

  const handleNavigateToParentLogin = () => {
    setCurrentPage('parentLogin')
  }

  return (
    <div className="app">
      {currentPage === 'roleSelection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      {currentPage === 'studentLogin' && (
        <StudentLogin 
          onLogin={() => handleLogin('student')} 
          onBack={handleBackToRoles}
        />
      )}
      {currentPage === 'teacherLogin' && (
        <TeacherLogin 
          onLogin={() => handleLogin('teacher')} 
          onBack={handleBackToRoles}
        />
      )}
      {currentPage === 'parentLogin' && (
        <ParentLogin 
          onLogin={() => handleLogin('parent')} 
          onBack={handleBackToRoles}
          onSignup={handleNavigateToParentSignup}
        />
      )}
      {currentPage === 'parentSignup' && (
        <ParentSignup 
          onSignupSuccess={handleNavigateToParentLogin}
          onBack={handleBackToRoles}
        />
      )}
      {currentPage === 'dashboard' && isLoggedIn && (
        <Dashboard role={userRole} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App

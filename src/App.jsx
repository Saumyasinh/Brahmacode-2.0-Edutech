import { useState } from 'react'
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
    // Clear parent data if logging out
    if (userRole === 'parent') {
      localStorage.removeItem('currentParent')
    }
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

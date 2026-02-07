import React, { useState } from 'react'

export default function StudentLogin({ onLogin, onBack }) {
  const [credentials, setCredentials] = useState({
    studentId: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (credentials.studentId && credentials.password) {
      // Store student data in localStorage
      const studentData = {
        id: credentials.studentId,
        name: credentials.studentId === 'AP001' ? 'Aryan Patel' : `Student ${credentials.studentId}`,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('studentData', JSON.stringify(studentData))
      onLogin()
    }
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <h2 className="login-title">STUDENT LOGIN</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={credentials.studentId}
            onChange={handleChange}
            placeholder="e.g., AP001 (Aryan Patel)"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="signup-link">
        New here? <a href="#signup">Create account</a>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

export default function StudentLogin({ onLogin, onBack }) {
  const [credentials, setCredentials] = useState({
    studentId: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!credentials.studentId || !credentials.password) {
      setError('Please fill in all fields')
      return
    }

    // Validate against student accounts in localStorage
    const studentAccounts = JSON.parse(localStorage.getItem('studentAccounts') || '[]')
    const student = studentAccounts.find(acc => acc.studentId === credentials.studentId)

    if (!student) {
      setError('Student account not found. Please check the Student ID.')
      return
    }

    if (student.password !== credentials.password) {
      setError('Incorrect password for this Student ID.')
      return
    }

    // Store student session
    localStorage.setItem('currentUser', JSON.stringify({
      role: 'student',
      studentId: student.studentId,
      studentName: student.fullName
    }))
    localStorage.setItem('role', 'student')
    onLogin()
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
        {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={credentials.studentId}
            onChange={handleChange}
            placeholder="e.g., S001, S002, S003"
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
            placeholder="Demo password: password123"
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="signup-link" style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>
        Demo credentials: S001 / password123
      </div>
    </div>
  )
}

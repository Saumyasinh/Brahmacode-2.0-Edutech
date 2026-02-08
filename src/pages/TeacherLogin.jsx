import React, { useState } from 'react'

export default function TeacherLogin({ onLogin, onBack }) {
  const [credentials, setCredentials] = useState({
    teacherId: '',
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

    if (!credentials.teacherId || !credentials.password) {
      setError('Please fill in all fields')
      return
    }

    // Validate against teacher accounts in localStorage
    const teacherAccounts = JSON.parse(localStorage.getItem('teacherAccounts') || '[]')
    const teacher = teacherAccounts.find(acc => acc.teacherId === credentials.teacherId)

    if (!teacher) {
      setError('Teacher account not found. Please check the Teacher ID.')
      return
    }

    if (teacher.password !== credentials.password) {
      setError('Incorrect password for this Teacher ID.')
      return
    }

    // Store teacher session
    localStorage.setItem('currentUser', JSON.stringify({
      role: 'teacher',
      teacherId: teacher.teacherId,
      teacherName: teacher.fullName
    }))
    localStorage.setItem('role', 'teacher')
    onLogin()
  }

  return (
    <div className="login-container">
      <div className="login-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <img src="/assets/assessmate-logo.png" alt="AssessMate" style={{ height: 40 }} />
        <h2 className="login-title">TEACHER LOGIN</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Teacher ID:</label>
          <input
            type="text"
            name="teacherId"
            value={credentials.teacherId}
            onChange={handleChange}
            placeholder="e.g., T001, T002, T003"
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

        {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <div className="signup-link" style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>
        Demo credentials: T001 / password123
      </div>
    </div>
  )
}

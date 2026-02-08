import React, { useState } from 'react'

export default function ParentLogin({ onLogin, onBack, onSignup }) {
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

    // Check credentials against student accounts (parents login with their child's credentials)
    const studentAccounts = JSON.parse(localStorage.getItem('studentAccounts') || '[]')
    const studentAccount = studentAccounts.find(
      acc => acc.studentId === credentials.studentId
    )

    if (!studentAccount) {
      setError('Student account not found. Please check the Student ID.')
      return
    }

    if (studentAccount.password !== credentials.password) {
      setError('Incorrect password for this Student ID.')
      return
    }

    // Store current user in localStorage as parent viewing this student
    localStorage.setItem('currentUser', JSON.stringify({
      role: 'parent',
      studentId: studentAccount.studentId,
      studentName: studentAccount.fullName
    }))
    localStorage.setItem('role', 'parent')
    onLogin()
  }

  return (
    <div className="login-container">
      <div className="login-header" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <img src="/assets/assessmate-logo.png" alt="AssessMate" style={{ height: 40 }} />
        <h2 className="login-title">PARENT LOGIN</h2>
      </div>

      <form onSubmit={handleSubmit}>
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

        {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '12px', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

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

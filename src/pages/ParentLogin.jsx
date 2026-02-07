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

    // Check credentials against localStorage
    const parentAccounts = JSON.parse(localStorage.getItem('parentAccounts') || '[]')
    const parentAccount = parentAccounts.find(
      acc => acc.studentId === credentials.studentId && acc.password === credentials.password
    )

    if (parentAccount) {
      // Store current parent in localStorage
      localStorage.setItem('currentParent', JSON.stringify(parentAccount))
      onLogin()
    } else {
      setError('Invalid Student ID or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <h2 className="login-title">PARENT LOGIN</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={credentials.studentId}
            onChange={handleChange}
            placeholder="Enter student's ID"
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
        Don't have an account? <a onClick={onSignup} style={{ cursor: 'pointer' }}>Sign up</a>
      </div>
    </div>
  )
}

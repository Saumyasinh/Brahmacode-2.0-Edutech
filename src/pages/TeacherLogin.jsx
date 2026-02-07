import React, { useState } from 'react'

export default function TeacherLogin({ onLogin, onBack }) {
  const [credentials, setCredentials] = useState({
    teacherId: '',
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
    if (credentials.teacherId && credentials.password) {
      onLogin()
    }
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
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
            placeholder="Enter your Teacher ID"
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

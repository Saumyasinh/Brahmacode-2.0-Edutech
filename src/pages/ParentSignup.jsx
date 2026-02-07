import React, { useState } from 'react'

export default function ParentSignup({ onSignupSuccess, onBack }) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    // Student ID validation
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required'
    } else {
      // Check for duplicate Student ID
      const parentAccounts = JSON.parse(localStorage.getItem('parentAccounts') || '[]')
      const duplicateAccount = parentAccounts.find(
        acc => acc.studentId === formData.studentId
      )
      if (duplicateAccount) {
        newErrors.studentId = 'This Student ID is already registered'
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return
    
    setSuccessMessage('')
    setErrors({})
    setIsSubmitting(true)

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Save to localStorage
      const parentAccounts = JSON.parse(localStorage.getItem('parentAccounts') || '[]')
      const newAccount = {
        fullName: formData.fullName,
        studentId: formData.studentId,
        email: formData.email,
        password: formData.password
      }
      parentAccounts.push(newAccount)
      localStorage.setItem('parentAccounts', JSON.stringify(parentAccounts))
      console.log('Account saved successfully:', newAccount)

      // Clear form
      setFormData({
        fullName: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Success message and redirect
      setSuccessMessage('Account created successfully! Redirecting to login...')
      setTimeout(() => {
        setIsSubmitting(false)
        onSignupSuccess()
      }, 1500)
    } catch (error) {
      console.error('Error saving account:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <button className="back-button" onClick={onBack}>
          ←
        </button>
        <h2 className="login-title">PARENT SIGNUP</h2>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`form-input ${errors.fullName ? 'input-error' : ''}`}
            required
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter your child's Student ID"
            className={`form-input ${errors.studentId ? 'input-error' : ''}`}
            required
          />
          {errors.studentId && <span className="error-text">{errors.studentId}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email (optional):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            required
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
            required
          />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="signup-link">
        Already have an account? <a onClick={() => window.history.back()} style={{ cursor: 'pointer' }}>Go back</a>
      </div>
    </div>
  )
}

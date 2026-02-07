import React from 'react'

export default function RoleSelection({ onRoleSelect }) {
  return (
    <div className="role-selection-container">
      <div className="logo-section">
        <div className="logo">🎓</div>
        <h1 className="logo-text">PrepSense AI</h1>
      </div>

      <p className="subtitle">Choose how you want to continue</p>

      <div className="buttons-container">
        <button className="role-button" onClick={() => onRoleSelect('student')}>
          Student
        </button>
        <button className="role-button" onClick={() => onRoleSelect('teacher')}>
          Teacher
        </button>
        <button className="role-button" onClick={() => onRoleSelect('parent')}>
          Parent
        </button>
      </div>
    </div>
  )
}

import React from 'react';
import './windows.scss';

const Success = () => {
  return (
    <div className="success-container">
      <div className="checkmark">
        <span className="checkmark-icon">✓</span>
      </div>
      <p className="success-message">Operation Successful</p>
    </div>
  );
}

export default Success;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
      <button onClick={onClose} className="ml-4">×</button>
    </div>
  );
};

export default Toast;
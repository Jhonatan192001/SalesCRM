// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Button({ text, onClick, type = "button", icon, color = "blue" }) {
  const baseClasses = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full";
  const colorClasses = {
    blue: "text-white bg-blue-600 hover:bg-blue-700",
    red: "text-white bg-red-600 hover:bg-red-700",
    green: "text-white bg-green-600 hover:bg-green-700",
    gray: "text-white bg-gray-600 hover:bg-gray-700",
    // Puedes añadir más colores según sea necesario
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]}`}
      onClick={onClick}
      type={type}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string,
};

export default Button;

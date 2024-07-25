import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function Input({ label, type, name, value, placeholder, onChange, options, icon }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handlers for select click and blur
  const handleSelectClick = () => setIsSelectOpen(!isSelectOpen);
  const handleSelectBlur = () => setIsSelectOpen(false);

  return (
    <div className="mb-4 relative">
      <label className="block text-black text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        {type === 'select' ? (
          <>
            <select
              className={`${inputClasses} pr-10`}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              onClick={handleSelectClick}
              onBlur={handleSelectBlur}
            >
              <option value="">{placeholder}</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FontAwesomeIcon icon={isSelectOpen ? faChevronUp : faChevronDown} className="h-4 w-4" />
            </div>
          </>
        ) : (
          <>
            <input
              className={`${inputClasses} ${type === 'password' ? 'pr-10' : ''}`}
              id={name}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
            />
            {type === 'password' && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </>
        )}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'select']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  icon: PropTypes.object
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  options: [],
  icon: null
};

export default Input;

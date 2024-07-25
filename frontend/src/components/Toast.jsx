import PropTypes from "prop-types";

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {message}
      <button onClick={onClose} className="ml-4">×</button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="relative w-full max-w-2xl mx-auto my-6 transition-all duration-300 ease-in-out transform scale-100 px-4 sm:px-0">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-500 h-6 w-6" />
            </button>
          </div>
          <div className="relative p-6 flex-auto overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;

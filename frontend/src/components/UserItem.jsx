import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserItem = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 border-b">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <img
          className="w-10 h-10 rounded-full"
          src={user.photo}
          alt={user.name}
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.position}</p>
          <p className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            {user.status}
          </p>
        </div>
        <div className="relative">
          <button onClick={toggleMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Editar
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                    Eliminar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItem;

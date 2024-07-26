import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserItem = ({ worker, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 px-6 border-t relative">
      <div className="flex items-center space-x-4 w-full sm:w-auto mb-2 sm:mb-0">
        <img
          className="w-10 h-10 rounded-full"
          src={worker.trab_foto || "../assets/defaultPhoto.png"}
          alt={`${worker.trab_nombres} ${worker.trab_apellidos}`}
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{`${worker.trab_nombres} ${worker.trab_apellidos}`}</p>
          <p className="text-sm text-gray-500">{worker.trab_email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end sm:ml-auto">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{worker.rol_nombre}</p>
          <p className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
            {worker.trab_estado}
          </p>
        </div>
        <div className="relative">
          <button 
            ref={buttonRef} 
            onClick={toggleMenu} 
            className="focus:outline-none p-2 bg-white rounded-full hover:bg-gray-100"
            aria-label="Opciones"
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500" />
          </button>
          {isMenuOpen && (
            <div 
              ref={menuRef}
              className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg"
              style={{
                right: '100%',
                top: '-60%',
              }}
            >
              <ul>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onEdit(worker);
                      setIsMenuOpen(false);
                    }}
                  >
                    Editar
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onEdit(worker);
                      setIsMenuOpen(false);
                    }}
                  >
                    Ver
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    onClick={() => {
                      onDelete(worker.trab_id);
                      setIsMenuOpen(false);
                    }}
                  >
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
  worker: PropTypes.shape({
    trab_id: PropTypes.number.isRequired,
    trab_foto: PropTypes.string,
    trab_nombres: PropTypes.string.isRequired,
    trab_apellidos: PropTypes.string.isRequired,
    trab_email: PropTypes.string.isRequired,
    rol_nombre: PropTypes.string.isRequired,
    trab_estado: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserItem;
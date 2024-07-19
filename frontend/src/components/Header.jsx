/* eslint-disable react/prop-types */
import { useState } from 'react';

const Header = ({ isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`bg-white shadow-md h-16 flex items-center transition-all duration-300 ${isOpen ? 'px-4' : 'px-4'}`}>
      <nav className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-lg font-semibold">Hola Jose👋</h1>
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm text-white rounded-full p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menú</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-3 px-4 border-b border-gray-200">
                  <span className="block text-sm font-semibold text-gray-900">Neil Sims</span>
                  <span className="block text-sm text-gray-500 truncate">name@flowbite.com</span>
                </div>
                <ul className="py-1 text-gray-500">
                  <li>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">Mi perfil</a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">Configuración de cuenta</a>
                  </li>
                </ul>
                <ul className="py-1 text-gray-500 border-t border-gray-200">
                  <li>
                    <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100">Cerrar sesión</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

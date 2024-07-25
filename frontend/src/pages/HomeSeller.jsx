import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faHouse,
  faShop,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import logoP from "../assets/LOSTP.png";
import logoG from "../assets/Recurso 221.png";
import NavItem from "../components/NavItem";
import { useNavigate } from "react-router-dom";

const HomeSeller = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Limpia la información de autenticación almacenada
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* MENU LATERAL */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#043f61] transition-all duration-300 flex flex-col justify-between ${
          isSidebarOpen ? "w-52" : "w-14"
        }`}
      >
        <div>
          <div className={`${isSidebarOpen ? "py-3 px-8" : "p-3"}`}>
            <img
              src={isSidebarOpen ? logoG : logoP}
              alt="Logo-Ost"
              className="w-full h-auto"
            />
          </div>
          <nav className="mt-2">
            <NavItem
              icon={faHouse}
              name="Inicio"
              link="#"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={faShop}
              name="Ventas"
              link="#"
              isOpen={isSidebarOpen}
            />
            <NavItem
              icon={faUsers}
              name="Clientes"
              link="#"
              isOpen={isSidebarOpen}
            />
          </nav>
        </div>
        <button onClick={toggleSidebar} className="p-2 m-4 text-white text-end">
          <FontAwesomeIcon icon={isSidebarOpen ? faArrowLeft : faArrowRight} />
        </button>
      </div>
      {/* CABECERA */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "pl-52" : "pl-14"
        }`}
      >
        <header className="bg-white shadow-md h-16 flex items-center px-4 transition-all duration-300">
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
                      <span className="block text-sm font-semibold text-gray-900">
                        Neil Sims
                      </span>
                      <span className="block text-sm text-gray-500 truncate">
                        name@flowbite.com
                      </span>
                    </div>
                    <ul className="py-1 text-gray-500">
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 text-sm hover:bg-gray-100"
                        >
                          Mi perfil
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 text-sm hover:bg-gray-100"
                        >
                          Configuración de cuenta
                        </a>
                      </li>
                    </ul>
                    <ul className="py-1 text-gray-500 border-t border-gray-200 hover:bg-gray-100">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block py-2 px-4 text-sm"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="p-4">Contenido Vendedor</main>
      </div>
    </div>
  );
};

export default HomeSeller;

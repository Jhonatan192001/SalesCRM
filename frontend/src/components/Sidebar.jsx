/* eslint-disable react/prop-types */
// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faHouse, faShop, faUsers } from '@fortawesome/free-solid-svg-icons';
import logoP from '../assets/LOSTP.png';
import logoG from '../assets/Recurso 221.png';
import NavItem from './NavItem';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-[#043f61] transition-all duration-300 flex flex-col justify-between ${isOpen ? 'w-52' : 'w-14'}`}>
      <div>
        <div className={`${isOpen ? 'py-3 px-8' : 'p-3'}`}>
          <img src={isOpen ? logoG : logoP} alt="Logo-Ost" className='w-full h-auto' />
        </div>
        <nav className="mt-2">
          <NavItem icon={faHouse} name="Inicio" link="#" isOpen={isOpen} />
          <NavItem icon={faShop} name="Ventas" link="#" isOpen={isOpen} />
          <NavItem icon={faUsers} name="Clientes" link="#" isOpen={isOpen} />
        </nav>
      </div>
      <button onClick={toggleSidebar} className="p-2 m-4 text-white text-end">
        <FontAwesomeIcon icon={isOpen ? faArrowLeft : faArrowRight} />
      </button>
    </div>
  );
};

export default Sidebar;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const HomeSeller = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-52' : 'pl-14'}`}>
        <Header isOpen={isSidebarOpen} />
        {/* Aquí va el contenido principal */}
        <main className="p-4">Contenido principal</main>
      </div>
    </div>
  );
};

export default HomeSeller;

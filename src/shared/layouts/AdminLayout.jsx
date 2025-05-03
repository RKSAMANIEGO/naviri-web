import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import UserSettings from "../components/AdminPanel/AdminConfig";

const AdminLayout = () => { 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  {/** TEMA POR SECCIÓN 

<div className="flex h-screen overflow-hidden">
  <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

  <main className="flex-1 flex flex-col overflow-hidden">

        <header className={`sticky top-0 h-14 z-10 duration-300
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center h-full px-6">
            <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} `} style={{ fontFamily: "'Great Vibes', Cursive" }}>Panel Admin</h1>
            <UserSettings/>
          </div>
        </header>

        {/* Contenido 
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>

      </main>
    </div>
    */}
    
    {/* TEMA GENERAL */}
  return (
  
    <div className={`flex h-screen overflow-hidden relative bg-gray-800 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} `} >
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-1 flex flex-col overflow-hidden">

        <header className={`sticky top-0 h-14 z-10 `}>
          <div className="flex items-center h-full px-6">
            <h1 className={`text-3xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} `} style={{ fontFamily: "'Great Vibes', Cursive" }}>Panel Admin</h1>
            <UserSettings />
          </div>
        </header>
      
        <div className="flex-1 overflow-auto p-6 bg-white rounded-tl-2xl text-black">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;
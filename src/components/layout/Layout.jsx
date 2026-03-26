
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
import { Sidebar, Navbar, AddTransactionModal } from '../index';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

 console.log(isModalOpen, "isModalOpen");

const [refreshTrigger, setRefreshTrigger] = useState(0);

 const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1); 
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar ko state aur close function pass karein */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-20 transition-all duration-300">
        {/* Navbar ko toggle function pass karein */}
        <Navbar 
        onMenuClick={() => setIsSidebarOpen(true)}
        onAddClick={() => {

          setIsModalOpen(true);
        }}
         />
        
        <main className="p-6 mt-16 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* The Modal */}
    <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Layout;
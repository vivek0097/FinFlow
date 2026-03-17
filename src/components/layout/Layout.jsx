

// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// const Layout = () => {
//   return (
//     <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
//       {/* Sidebar fixed rahega */}
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col md:ml-64">
//         <Navbar />
        
//         {/* Main Content Area */}
//         <main className="p-6 mt-16 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar ko state aur close function pass karein */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-20 transition-all duration-300">
        {/* Navbar ko toggle function pass karein */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="p-6 mt-16 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
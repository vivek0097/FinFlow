
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, History, PieChart, Target, Settings, X, 
  Users, ShieldAlert, Database 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; 

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth(); // Maan lete hain user object mein 'role' hai

  // 1. User Menus (Normal users ke liye)
  const userMenus = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Audit Log', path: '/audit', icon: <History size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
    { name: 'Savings', path: '/savings', icon: <Target size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  // 2. Admin Menus (Sirf Admin ko dikhenge)
  const adminMenus = [
    { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Audit Log', path: '/audit', icon: <History size={20} /> },
    { name: 'System Status', path: '/admin/status', icon: <ShieldAlert size={20} /> },
  ];

  // 3. Logic: Role ke hisaab se menu select karo
  const menus = user?.role === 'admin' ? adminMenus : userMenus;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-white/5 
        transition-all duration-300 ease-in-out z-[60] 
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20 md:hover:w-64'}
        group
      `}>
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-center relative">
          <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-1.5 transition-transform group-hover:scale-110">
        
             <img src="/assests/images/miniLogo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <button onClick={onClose} className="md:hidden absolute right-4 text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-2 px-3 space-y-1.5 overflow-hidden">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-4 px-3 py-3 rounded-xl font-bold transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600'}
              `}
            >
              <div className="min-w-[20px] flex justify-center">{menu.icon}</div>
              <span className={`text-sm whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {menu.name}
              </span>
            </NavLink>
          ))}
          
          {/* Settings Universal Menu */}
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center gap-4 px-3 py-3 rounded-xl font-bold transition-all duration-200
              ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600'}
            `}
          >
            <div className="min-w-[20px] flex justify-center"><Settings size={20} /></div>
            <span className={`text-sm whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              Settings
            </span>
          </NavLink>
        </nav>

        {/* Financial Health Banner: Sirf User ko dikhao */}
        {user?.role !== 'admin' && (
          <div className={`absolute bottom-8 left-3 right-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="bg-slate-900 dark:bg-white/5 p-4 rounded-[20px] border border-white/10">
              <p className="text-[10px] text-indigo-400 font-black uppercase tracking-wider">Financial Health</p>
              <div className="h-1.5 w-full bg-slate-800 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full w-[82%]"></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                 <p className="text-[10px] font-bold text-slate-300">82%</p>
              </div>
            </div>
          </div>
        )}

        {/* Admin Badge: Agar admin ho toh bottom mein chota badge dikhao */}
        {user?.role === 'admin' && (
          <div className={`absolute bottom-8 left-3 right-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
              <p className="text-[10px] text-amber-500 font-black text-center uppercase tracking-tighter">Admin Control Panel</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { LayoutDashboard, History, PieChart, Target, Settings, X } from 'lucide-react';

// const Sidebar = ({ isOpen, onClose }) => {
//   const menus = [
//     { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
//     { name: 'Audit Log', path: '/audit', icon: <History size={20} /> },
//     { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
//     { name: 'Savings', path: '/savings', icon: <Target size={20} /> },
//     { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden" onClick={onClose} />
//       )}

//       {/* Sidebar Container: Added 'group' and dynamic width */}
//       <aside className={`
//         fixed top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-white/5 
//         transition-all duration-300 ease-in-out z-[60] 
//         ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20 md:hover:w-64'}
//         group
//       `}>
//         {/* Logo Section: Padding reduced (p-4 instead of p-6) */}
//         <div className="p-4 flex items-center justify-center relative">
//           <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-1.5 transition-transform group-hover:scale-110">
//             <img src="/assests/images/miniLogo.png" alt="FinFlow Logo" className="w-full h-full object-contain" />
//           </div>
//           <button onClick={onClose} className="md:hidden absolute right-4 text-gray-400 hover:text-slate-600">
//             <X size={24} />
//           </button>
//         </div>
        
       

//         {/* Navigation Links Section */}
// <nav className="mt-2 px-3 space-y-1.5 overflow-hidden">
//   {menus.map((menu) => (
//     <NavLink
//       key={menu.path}
//       to={menu.path}
//       onClick={onClose}
//       className={({ isActive }) => `
//         flex items-center gap-4 px-3 py-3 rounded-xl font-bold transition-all duration-200
//         ${isActive 
//           ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
//           : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600'}
//       `}
//     >
//       <div className="min-w-[20px] flex justify-center">
//         {menu.icon}
//       </div>

//       {/* FIXED: Text visibility logic */}
//       <span className={`
//         text-sm whitespace-nowrap transition-opacity duration-300
//         ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 md:opacity-0'}
//       `}>
//         {menu.name}
//       </span>
//     </NavLink>
//   ))}
// </nav>

// {/* FIXED: Financial Health Banner logic */}
// <div className={`
//   absolute bottom-8 left-3 right-3 transition-opacity duration-300
//   ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
// `}>
//   <div className="bg-slate-900 dark:bg-white/5 p-4 rounded-[20px] border border-white/10">
//     <p className="text-[10px] text-indigo-400 font-black uppercase tracking-wider">Financial Health</p>
//     {/* ... rest of the code ... */}
//   </div>
// </div>

//         {/* Financial Health Banner: Hidden on mini-sidebar, visible on hover */}
//         <div className="absolute bottom-8 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="bg-slate-900 dark:bg-white/5 p-4 rounded-[20px] border border-white/10">
//             <p className="text-[10px] text-indigo-400 font-black uppercase tracking-wider">Financial Health</p>
//             <div className="h-1.5 w-full bg-slate-800 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
//               <div className="h-full bg-indigo-500 rounded-full w-[82%]"></div>
//             </div>
//             <div className="flex justify-between items-center mt-3">
//                <p className="text-[10px] font-bold text-slate-300">82%</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
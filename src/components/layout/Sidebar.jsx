


import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, PieChart, Target, Settings, X, CreditCard } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menus = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Audit Log', path: '/audit', icon: <History size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <PieChart size={20} /> },
    { name: 'Savings', path: '/savings', icon: <Target size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-white/5 
        transition-all duration-300 z-[60] w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <CreditCard size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">FinFlow</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-slate-600"><X size={24} /></button>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-4 px-4 space-y-1.5">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400'}
              `}
            >
              <span className={({ isActive }) => isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}>
                {menu.icon}
              </span>
              <span className="text-sm">{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Financial Health Banner */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="bg-slate-900 dark:bg-white/5 p-4 rounded-[24px] border border-white/10">
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.1em]">Financial Health</p>
            <div className="h-1.5 w-full bg-slate-800 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-[82%] transition-all duration-1000"></div>
            </div>
            <div className="flex justify-between items-center mt-3">
                <p className="text-[10px] font-bold text-slate-300">82% Score</p>
                <p className="text-[9px] text-slate-500 italic">Doing Great!</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
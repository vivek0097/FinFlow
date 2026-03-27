


import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Menu, User, Plus, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';



const Navbar = ({ onMenuClick, onAddClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();



  return (
    // <nav className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 z-40 flex items-center justify-between px-6 transition-all duration-300">
      <nav className="fixed top-0 right-0 left-0 md:left-20 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 z-40 flex items-center justify-between px-6 transition-all duration-300">
      {/* Left Section: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2.5 -ml-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:block">
          <h2 className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Financial Overview</h2>
          <div className="flex items-center gap-1.5">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
             </span>
             <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-black italic">FinFlow AI Active</p>
          </div>
        </div>
      </div>
      
      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Quick Add Button - Only visible on Tablet/Desktop */}
        <button 
          onClick={onAddClick}
          className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none mr-2"
        >
          <Plus size={16} strokeWidth={3} />
          <span>NEW</span>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-yellow-400 hover:scale-110 active:scale-90 transition-all border border-gray-100 dark:border-white/5"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 relative border border-gray-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
        </button>
        


        <div className="flex items-center gap-4">
        {/* {user ? (
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="hidden md:block font-medium dark:text-white">{user.name}</span>
            <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl">Login</button>
        )} */}

        {user ? (
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 pr-3 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
          <NavLink 
          to="/profile" 
          className={({ isActive }) => `
            flex items-center gap-3 p-1.5 pr-3 rounded-2xl border transition-all duration-200 shadow-sm
            ${isActive 
              ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20' 
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-700'}
          `}
        >
          
            {/* Profile Image or Initial */}
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold overflow-hidden shadow-inner border-2 border-white dark:border-slate-700">
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm">{user.name.charAt(0)}</span>
              )}
            </div>

            {/* User Info */}
            <div className="hidden md:flex flex-col items-start leading-tight">
              <span className="text-xs font-black dark:text-white truncate max-w-[100px]">
                {user.name}
              </span>
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">
                {user.role}
              </span>
            </div>
</NavLink>
            {/* Logout Button */}
            <button 
              onClick={logout} 
              className="ml-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
            Login
          </button>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
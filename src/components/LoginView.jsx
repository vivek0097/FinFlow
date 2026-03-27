import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const LoginView = ({ formData, setFormData, handleSubmit, setIsLogin, setIsForgot }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="email" required placeholder="Email Address" 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type={showPassword ? "text" : "password"} 
            required 
            placeholder="Password" 
            className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          {/* Eye Icon Button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={20} /> // Closed eye (Monkey covering eyes logic)
            ) : (
              <Eye size={20} />    // Open eye
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button 
            type="button" 
            onClick={() => setIsForgot(true)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
          Sign In <ArrowRight size={18} />
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={() => setIsLogin(false)} 
          className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginView;
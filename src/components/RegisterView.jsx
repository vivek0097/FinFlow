import React from 'react';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

const RegisterView = ({ formData, setFormData, handleSubmit, setIsLogin }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" required placeholder="Full Name" 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="email" required placeholder="Email Address" 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Mobile Field - NEW ADDITION */}
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" required placeholder="Mobile Number (10 digits)" 
            maxLength={10}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="password" required placeholder="Create Password" 
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
          Create Account <ArrowRight size={18} />
        </button>
      </form>

      <div className="text-center">
        <button onClick={() => setIsLogin(true)} className="text-sm font-bold text-slate-500 hover:text-indigo-600">
          Already a member? Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterView;
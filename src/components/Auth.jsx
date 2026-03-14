import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const { data } = await axios.post(url, formData);

      if (isLogin) {
        login(data.user, data.token);
        navigate('/'); // Dashboard par bhej dein
      } else {
        alert("Registration successful! Now please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
        
        <div className="text-center relative">
          <div className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-4">
            <CreditCard size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join FinFlow'}
          </h2>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" required
                placeholder="Full Name" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" required
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" required
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center pt-4">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600">
            {isLogin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
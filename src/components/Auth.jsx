import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CreditCard, ShieldCheck, KeyRound, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', otp: '', newPassword: '' });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Login & Register Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await axios.post(`${API_URL}${endpoint}`, formData);

      if (isLogin) {
        login(data.user, data.token);
        navigate('/');
      } else {
        alert("Registration successful! Now please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  // Forgot Password - Step 1: Send OTP
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email: formData.email });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.msg || "Error sending OTP");
    }
  };

  // Forgot Password - Step 2: Reset Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword
      });
      alert("Password updated! Now login.");
      setIsForgot(false);
      setIsLogin(true);
      setStep(1);
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
        
        {/* Header Section */}
        <div className="text-center relative">
          <div className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200 dark:shadow-none">
            <CreditCard size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black dark:text-white tracking-tight">
            {isForgot ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Join FinFlow')}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {isForgot ? 'Secure your account with OTP' : 'Master your finances today'}
          </p>
        </div>

        {/* --- TOGGLE LOGIC STARTS HERE --- */}
        {isForgot ? (
          /* 1. FORGOT PASSWORD VIEW */
          <div className="space-y-6">
            <form onSubmit={step === 1 ? handleForgotSubmit : handleResetSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" placeholder="Registered Email" required
                  disabled={step === 2}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white disabled:opacity-60"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" placeholder="6-Digit OTP" required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="password" placeholder="New Password" required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                {step === 1 ? 'Send OTP' : 'Update Password'}
                <ArrowRight size={18} />
              </button>
            </form>

            <button 
              onClick={() => {setIsForgot(false); setStep(1);}}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft size={16} />
              Back to Login
            </button>
          </div>
        ) : (
          /* 2. LOGIN / REGISTER VIEW */
          <div className="space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" required placeholder="Full Name" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" required placeholder="Email Address" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" required placeholder="Password" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={() => setIsForgot(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
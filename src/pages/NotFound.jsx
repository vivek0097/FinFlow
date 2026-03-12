import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icon Section */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-white dark:bg-slate-900 p-8 rounded-full shadow-2xl border border-gray-100 dark:border-slate-800 animate-bounce-slow">
            <AlertCircle size={80} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-8xl font-black text-slate-900 dark:text-white tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Lost in the Cash Flow?</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Afsos! Jo page aap dhoond rahe hain wo hamare audit log mein nahi mil raha. 
            Lagta hai ye link thoda "over-budget" ho gaya.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
          >
            <Home size={20} /> Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
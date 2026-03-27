import React, { useEffect, useState } from 'react';
import { Mail, ShieldCheck, Lock, ArrowRight, ChevronLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

const ForgotPassView = ({ step, formData, setFormData, handleForgotSubmit, handleResetSubmit, setIsForgot, setStep }) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password hide/show state

  // Step 2 par aate hi bypass OTP set karna
  useEffect(() => {
    if (step === 2) {
      setFormData(prev => ({ ...prev, otp: '123456' }));
    }
  }, [step, setFormData]);

  // Frontend Validation Logic
  const onPasswordChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, newPassword: val });
    
    if (val.length > 0 && val.length < 6) {
      setError("Password must be at least 6 characters");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <form onSubmit={step === 1 ? handleForgotSubmit : handleResetSubmit} className="space-y-5">
        
        {/* Step 1: Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="email" placeholder="Registered Email" required
            disabled={step === 2}
            value={formData.email}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white disabled:opacity-60"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Step 2: OTP & New Password */}
        {step === 2 && (
          <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-300">
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" placeholder="6-Digit OTP" required
                value={formData.otp}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
                onChange={(e) => setFormData({...formData, otp: e.target.value})}
              />
            </div>

            {/* Password with Eye Icon */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="New Password" 
                required
                className={`w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ${error ? 'ring-red-500' : 'ring-indigo-500'} dark:text-white`}
                onChange={onPasswordChange}
              />
              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="flex items-center gap-1 text-xs font-bold text-red-500 animate-pulse">
                <AlertCircle size={14} /> {error}
              </p>
            )}
          </div>
        )}

        <button 
          type="submit" 
          disabled={step === 2 && formData.newPassword.length < 6}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
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
  );
};

export default ForgotPassView;



// import React from 'react';
// import { Mail, ShieldCheck, Lock, ArrowRight, ChevronLeft } from 'lucide-react';

// const ForgotPassView = ({ step, formData, setFormData, handleForgotSubmit, handleResetSubmit, setIsForgot, setStep }) => {
//   return (
//     <div className="space-y-6 animate-in fade-in duration-300">
//       <form onSubmit={step === 1 ? handleForgotSubmit : handleResetSubmit} className="space-y-5">
//         {/* Step 1: Email Input */}
//         <div className="relative">
//           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="email" placeholder="Registered Email" required
//             disabled={step === 2}
//             className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white disabled:opacity-60"
//             onChange={(e) => setFormData({...formData, email: e.target.value})}
//           />
//         </div>

//         {/* Step 2: OTP & New Password */}
//         {step === 2 && (
//           <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-300">
//             <div className="relative">
//               <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input 
//                 type="text" placeholder="6-Digit OTP" required
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
//                 onChange={(e) => setFormData({...formData, otp: e.target.value})}
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input 
//                 type="password" placeholder="New Password" required
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white"
//                 onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
//               />
//             </div>
//           </div>
//         )}

//         <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
//           {step === 1 ? 'Send OTP' : 'Update Password'}
//           <ArrowRight size={18} />
//         </button>
//       </form>

//       <button 
//         onClick={() => {setIsForgot(false); setStep(1);}}
//         className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
//       >
//         <ChevronLeft size={16} />
//         Back to Login
//       </button>
//     </div>
//   );
// };

// export default ForgotPassView;
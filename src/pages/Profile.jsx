import React, { useState } from 'react';
import { Camera, User, Mail, Phone, ShieldCheck, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { compressImage } from '../utils/compressImage';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';



const Profile = () => {
  const { user, updateUser } = useAuth(); 
  const { sendRequest, loading } = useFetch();
  const [preview, setPreview] = useState(user?.profileImage || null);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const base64 = await compressImage(file);
//       setPreview(base64);
      
//       // Auto-save image to Backend
//       try {
//         const res = await sendRequest('/users/update-profile', 'POST', { profileImage: base64 });
//         if (res.status === 1) {
//           updateUser({ ...user, profileImage: base64 });
//           alert("Profile Picture Updated!");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    // 1. Loading state dikhao (Promise Toast)
    const uploadToast = toast.loading("Uploading profile picture...");

    try {
      setUploading(true);
      const base64 = await compressImage(file);
      setPreview(base64);

      const res = await sendRequest('/users/update-profile', 'POST', { profileImage: base64 });

      if (res && res.status === 1) {
        updateUser({ ...user, profileImage: base64 });
        
        // ✅ Success Toast (Upar wale loading toast ko update karega)
        toast.success("Profile updated successfully!", { id: uploadToast });
      } else {
        // ❌ Error Toast
        toast.error(res?.msg || "Update failed.", { id: uploadToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during upload.", { id: uploadToast });
    } finally {
      setUploading(false);
    }
  }
};


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Account Settings</h1>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          {/* Avatar Upload */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-[40px] bg-indigo-50 dark:bg-indigo-500/10 border-4 border-white dark:border-slate-800 overflow-hidden shadow-xl">
              {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-indigo-500 text-5xl font-black">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
            <label className="absolute bottom-2 right-2 p-3 bg-indigo-600 text-white rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-lg">
              <Camera size={20} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* User Details Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent focus-within:border-indigo-500 transition-all">
                <User size={18} className="text-slate-400" />
                <input type="text" defaultValue={user?.name} className="bg-transparent outline-none w-full text-sm font-bold dark:text-white" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent focus-within:border-indigo-500 transition-all">
                <Mail size={18} className="text-slate-400" />
                <input type="email" defaultValue={user?.email} className="bg-transparent outline-none w-full text-sm font-bold dark:text-white" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mobile Number</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent focus-within:border-indigo-500 transition-all">
                <Phone size={18} className="text-slate-400" />
                <input type="text" defaultValue={user?.mobile} className="bg-transparent outline-none w-full text-sm font-bold dark:text-white" readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Role Status</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-sm font-black text-emerald-600 uppercase">{user?.role} Account</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
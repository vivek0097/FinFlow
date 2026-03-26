import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, IndianRupee, Tag, Calendar, Layers, CheckCircle2 } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import moment from 'moment';



const AddTransactionModal = ({ isOpen, onClose, onRefresh, editData }) => {
  const isEdit = !!editData;
 const navigate=  useNavigate();
  const [formData, setFormData] = useState({
   description: '',
    amount: '',
    type: 'expense',
    category: 'General',
    date: moment().format('YYYY-MM-DD'),
  });

  const { sendRequest, loading, error } = useFetch();
  const [success, setSuccess] = useState(false);

  const categories = ['General', 'Salary', 'Food', 'Rent', 'Shopping', 'Bills', 'Freelance', 'Health'];

//----for  modify--------------
  useEffect(() => {
    if (editData) {
      setFormData({
        description: editData.description || editData.desc,
        amount: editData.amount,
        type: editData.type,
        category: editData.category || editData.cat,
        date: moment(editData.date).format('YYYY-MM-DD')
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const url = isEdit ? `/transactions/${editData._id}` : '/transactions';
      const method = isEdit ? 'PUT' : 'POST';
      await sendRequest(url, method, formData);
      // await sendRequest('/transactions', 'POST', formData);
      setSuccess(true);
      

      setTimeout(() => {
        setSuccess(false);
        setFormData({ description: '', amount: '', type: 'expense', category: 'General', date: moment(formData.date).toISOString() });
        onRefresh && onRefresh(); 
        onClose();
        navigate('/audit')
      }, 1500);
    } catch (err) {
      console.error("Transaction Error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl border border-white/20 overflow-hidden relative">
        
        {/* Success Overlay */}
        {success && (
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 z-10 flex flex-col items-center justify-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">Transaction Added!</h3>
          </div>
        )}

        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-50 dark:border-white/5">
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">New Transaction</h2>
            <p className="text-xs text-slate-400 font-medium">Add your income or expenses</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-all">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Amount Field (Big & Bold) */}
          <div className="relative group">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Amount</label>
            <div className="relative mt-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <IndianRupee size={18} className="text-indigo-600" />
              </div>
              <input 
                type="number"
                required
                placeholder="0.00"
                className="w-full pl-16 pr-6 py-4 bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-[22px] outline-none transition-all text-2xl font-black text-slate-800 dark:text-white"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description / Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Amazon Web Services"
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-transparent focus:border-indigo-500/30 rounded-2xl outline-none transition-all text-sm font-bold"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Type & Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-transparent rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Expense (-)</option>
                <option value="income">Income (+)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-transparent rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
            <input 
              type="date"
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border-transparent rounded-2xl outline-none font-bold text-sm"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-4 rounded-[22px] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-[0.97] flex items-center justify-center gap-2"
          >
            {loading ? 'Processing Sync...' : 'Confirm Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
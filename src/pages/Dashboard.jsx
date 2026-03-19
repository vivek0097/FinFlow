import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Activity, TrendingUp } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import moment from 'moment';

const COLORS = ['#6366f1', '#fb7185', '#34d399', '#fbbf24', '#a855f7', '#06b6d4'];

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { sendRequest, loading } = useFetch();

  // 1. Data Fetching Logic
  const fetchDashboardData = useCallback(async () => {
    try {
      const [monthlyStats, allTx] = await Promise.all([
        sendRequest('/transactions/stats/monthly', 'GET'),
        sendRequest('/transactions', 'GET')
      ]);
      setChartData(monthlyStats);
      setTransactions(allTx);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  }, [sendRequest]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 2. Summary Calculations (Derived State)
  const stats = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      const amt = Number(curr.amount);
      if (curr.type === 'income') {
        acc.income += amt;
        acc.balance += amt;
      } else {
        acc.expense += amt;
        acc.balance -= amt;
      }
      // Category Breakdown for Pie Chart
      if (curr.type === 'expense') {
        acc.categories[curr.category] = (acc.categories[curr.category] || 0) + amt;
      }
      return acc;
    }, { balance: 0, income: 0, expense: 0, categories: {} });
  }, [transactions]);

  // Format Category Data for Pie Chart
  const pieData = Object.keys(stats.categories).map(key => ({
    name: key,
    value: stats.categories[key]
  }));

  const healthScore = stats.income > 0 
    ? Math.round(((stats.income - stats.expense) / stats.income) * 100) 
    : 0;

  if (loading && transactions.length === 0) {
    return <div className="h-96 flex items-center justify-center font-black text-indigo-500 animate-pulse">FINFLOW ANALYSING...</div>;
  }



const StatCard = ({ title, amount, icon, color, amountColor }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-5 transition-all hover:scale-[1.02] hover:shadow-md">
    {/* Icon Container */}
    <div className={`w-14 h-14 rounded-2xl bg-${color}-50 dark:bg-${color}-500/10 flex items-center justify-center text-${color}-600`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    
    {/* Text Content */}
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
        {title}
      </p>
      <h3 className={`text-2xl font-black ${amountColor} tracking-tight`}>
        ₹{amount.toLocaleString()}
      </h3>
    </div>
  </div>
);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 text-sm font-medium">Welcome back! Here's what's happening with your money.</p>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</span>
          <div className="flex items-center gap-2 text-emerald-500 font-bold">
            <Activity size={16} /> System Synced
          </div>
        </div>
      </div>

 
              {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Balance" 
            amount={stats.balance} 
            icon={<Wallet />} 
            color="indigo" 
            amountColor="text-slate-800 dark:text-white"
          />
          <StatCard 
            title="Total Income" 
            amount={stats.income} 
            icon={<ArrowUpCircle />} 
            color="emerald" 
            amountColor="text-emerald-500" 
          />
          <StatCard 
            title="Total Expense" 
            amount={stats.expense} 
            icon={<ArrowDownCircle />} 
            color="rose" 
            amountColor="text-rose-500" 
          />
        </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-sm">Cash Flow Trends</h3>
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="text-indigo-500">● Income</span>
              <span className="text-rose-400">● Expense</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={4} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={4} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown & Health */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
             <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
             <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Savings Health</h4>
             <div className="text-5xl font-black mb-2">{healthScore}%</div>
             <p className="text-sm font-medium opacity-90">
               {healthScore > 20 ? "You're doing great! Keep saving." : "Try to reduce unnecessary expenses."}
             </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm">
            <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-xs mb-6 text-center">Expense by Category</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, amount, icon, color }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-5 transition-all hover:scale-[1.02]">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-50 dark:bg-${color}-500/10 flex items-center justify-center text-${color}-600`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{title}</p>
      <h3 className="text-2xl font-black text-slate-800 dark:text-white">₹{amount.toLocaleString()}</h3>
    </div>
  </div>
);

export default Dashboard;


// import React from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { ArrowUpCircle, ArrowDownCircle, Wallet, Target } from 'lucide-react';

// // Chart ke liye Dummy Data
// const chartData = [
//   { name: 'Jan', income: 45000, expense: 32000 },
//   { name: 'Feb', income: 52000, expense: 35000 },
//   { name: 'Mar', income: 48000, expense: 41000 },
//   { name: 'Apr', income: 61000, expense: 38000 },
//   { name: 'May', income: 55000, expense: 30000 },
//   { name: 'Jun', income: 67000, expense: 42000 },
// ];

// const Dashboard = () => {
//   // ... purana stats array wahi rahega ...

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       {/* Stats Cards Row (Jo humne pehle banaya tha) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Card components yahan aayenge */}
//       </div>

//       {/* Analytics Chart Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-bold dark:text-white">Cash Flow Trends</h3>
//             <div className="flex gap-4 text-xs font-semibold">
//                <span className="flex items-center gap-1 text-indigo-500"><span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Income</span>
//                <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 bg-rose-400 rounded-full"></span> Expense</span>
//             </div>
//           </div>
          
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
//                 <YAxis hide />
//                 <Tooltip 
//                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
//                 />
//                 <Area type="monotone" dataKey="income" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
//                 <Area type="monotone" dataKey="expense" stroke="#fb7185" strokeWidth={3} fill="transparent" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Financial Health Score (Side Card) */}
//         <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
//             {/* Score Gauge ka code yahan aayega */}
//             <h4 className="font-bold dark:text-white mb-2">Health Score</h4>
//             <div className="text-4xl font-black text-indigo-600">82%</div>
//             <p className="text-sm text-gray-500 text-center mt-2">You saved 15% more than last month!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
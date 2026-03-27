import React from 'react';
import { Users, ShieldCheck, Database, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Static data for now, replace with API later
  const systemStats = [
    { title: 'Total Registered Users', value: '1,284', icon: <Users />, color: 'indigo' },
    { title: 'Active Sessions', value: '42', icon: <Activity />, color: 'emerald' },
    { title: 'Security Logs', value: '156', icon: <ShieldCheck />, color: 'rose' },
    { title: 'DB Queries/sec', value: '0.8ms', icon: <Database />, color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Admin Console</h1>
        <p className="text-slate-500 text-sm font-medium">Monitoring FinFlow System Integrity and User Activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-600 mb-4`}>
              {React.cloneElement(stat.icon, { size: 24 })}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.title}</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm h-[400px]">
          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-xs mb-8">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={[{n:'Jan', u:400}, {n:'Feb', u:800}, {n:'Mar', u:1200}]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="n" hide />
              <Tooltip />
              <Area type="monotone" dataKey="u" stroke="#6366f1" fillOpacity={1} fill="#6366f110" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4">System Alerts</h4>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex gap-3 items-start border-b border-white/5 pb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">Backup Successful</p>
                    <p className="text-[10px] text-slate-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
            Download Audit Report <ArrowUpRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
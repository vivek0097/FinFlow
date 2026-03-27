import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserDashboard from './UserDashboard'; 
import AdminDashboard from './AdminDashboard'; 

const Dashboard = () => {
  const { user } = useAuth();

  // Role ke basis par component chunna
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

export default Dashboard;
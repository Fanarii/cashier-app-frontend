import React from 'react';
import HomeButton from '../utils/HomeButton';
import MessageButton from '../utils/MessageButton';
import BillButton from '../utils/BillButton';
import DashboardButton from '../utils/DashboardButton';
import SettingButton from '../utils/SettingButton';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[90px] h-screen bg-white">
      <HomeButton active={activePage === '/'} onClick={() => navigate('/')} />
      <MessageButton active={location.pathname === '/messages'} onClick={() => navigate('/messages')} />
      <BillButton active={location.pathname === '/bills'} onClick={() => navigate('/bills')} />
      <DashboardButton active={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} />
      <SettingButton active={location.pathname === '/settings'} onClick={() => navigate('/settings')} />
    </div>
  );
};

export default Sidebar;

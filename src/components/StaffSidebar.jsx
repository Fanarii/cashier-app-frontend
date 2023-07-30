import React, { useState, useEffect } from 'react';
import { FaUser, FaUtensils, FaClipboardList, FaHome } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';


const SidebarItem = ({ to, exact, icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      activeClassName="bg-primary text-white"
      className={`flex items-center space-x-2 p-2 cursor-pointer hover:bg-primary rounded-md hover:text-white hover:shadow-lg my-2 ${
        isActive ? 'bg-primary text-white shadow-lg' : ''
      }`}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const StaffSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('/');

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <div className="flex">
      <div className="bg-white w-1/5 p-4 shadow-md min-h-screen min-w-[240px]">
        <SidebarItem to="/staff" exact icon={<FaHome />} label="Home" isActive={activeItem === '/staff'} />
        <SidebarItem to="/user" icon={<FaUser />} label="User Management" isActive={activeItem === '/user'} />
        <SidebarItem to="/menu" icon={<FaUtensils />} label="Menu Management" isActive={activeItem === '/menu'} />
        <SidebarItem to="/order" icon={<FaClipboardList />} label="Order List" isActive={activeItem === '/order'} />
      </div>
    </div>
  );
};

export default StaffSidebar;

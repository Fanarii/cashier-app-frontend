import React from 'react';

import StaffSidebar from '../components/StaffSidebar';

const StaffDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">        
        <StaffSidebar/>
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

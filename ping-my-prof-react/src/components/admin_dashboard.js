// AdminDashboard.js
import React from 'react';
import Sidebar from './common/sidebar';

const AdminDashboard = () => {
  return (
    // <div className='page-content'>

      <div className="admin-dashboard">
      <Sidebar role="admin" />
      <div className="main-content">
        {/* Admin Dashboard content */}
        <h2>Admin Dashboard</h2>
        {/* More content here */}
      </div>
    </div>
    // </div>
  );
};

export default AdminDashboard;

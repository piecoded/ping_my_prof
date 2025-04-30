import React, { useEffect, useState } from 'react';
import Sidebar from './common/sidebar';

const StudentDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/student_dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Dashboard data:', data);

        if (response.ok) {
          setMessage(data.message);
        } else {
          console.error('Error fetching dashboard:', data.message);
        }
      } catch (error) {
        console.error('Dashboard fetch error:', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    // <div className='page-content'>

    <div className="student-dashboard">
      <Sidebar role="student" />
      <div className="main-content">
        <h2>Student Dashboard</h2>
        {/* You can show message too if you want */}
        {/* <p>{message}</p> */}
      </div>
    </div>
    //</div>
  );
};

export default StudentDashboard;

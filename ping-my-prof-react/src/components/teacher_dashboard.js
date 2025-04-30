import React, { useEffect, useState } from 'react';
import Sidebar from './common/sidebar'; // Assuming same sidebar component

const TeacherDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/teacher_dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Teacher Dashboard data:', data);

        if (response.ok) {
          setMessage(data.message);
        } else {
          console.error('Error fetching dashboard:', data.message);
        }
      } catch (error) {
        console.error('Teacher Dashboard fetch error:', error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    // <div className='page-content'>

    <div className="teacher-dashboard">
      <Sidebar role="teacher" />
      <div className="main-content">
        <h2>Teacher Dashboard</h2>
        {/* <p>{message}</p> */}
      </div>
    </div>
    // </div>
  );
};

export default TeacherDashboard;

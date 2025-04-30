// components/appointments/ViewAppointments.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles.css";

const ViewAppointments = () => {
  const location = useLocation();
  const { role } = location.state || {};  // safe fallback

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = '';

        if (role === 'student') {
          url = 'http://localhost:5000/api/appointments/my_student_appointments';
        } else if (role === 'teacher') {
          url = 'http://localhost:5000/api/appointments/my_appointments';
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [role]);

  // Handle appointment approval or denial
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Appointment ${newStatus} successfully!`);
        // Refresh appointments state
        setAppointments(prev =>
          prev.map(appt =>
            appt._id === appointmentId ? { ...appt, status: newStatus } : appt
          )
        );
      } else {
        alert(data.message || 'Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className='page-content'>
      <div className="appointments-container">
        <h2 className="appointments-heading">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p className="no-appointments">No appointments found.</p>
        ) : (
          <ul className="appointments-list">
            {appointments.map((appt) => (
              <li key={appt._id} className="appointment-item">
                <p><strong>Date:</strong> {new Date(appt.dateTime).toLocaleString()}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`status-badge ${appt.status.toLowerCase()}`}>
                    {appt.status}
                  </span>
                </p>

                {role === 'student' && <p><strong>Teacher:</strong> {appt.teacher.name || 'N/A'}</p>}
                {role === 'teacher' && <p><strong>Student:</strong> {appt.student.name || 'N/A'}</p>}

                {role === 'teacher' && appt.status === 'pending' && (
                  <div className="action-buttons">
                    <button onClick={() => handleStatusChange(appt._id, 'approved')} className="approve-btn">
                      Approve
                    </button>
                    <button onClick={() => handleStatusChange(appt._id, 'denied')} className="deny-btn">
                      Deny
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;

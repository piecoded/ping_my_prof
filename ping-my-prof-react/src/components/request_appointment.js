// components/appointments/RequestAppointment.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestAppointment = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate();

useEffect(() => {
    // Fetch the list of teachers when the component mounts
    fetch('http://localhost:5000/api/teachers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using a token for authentication
      },
    })
      .then((res) => res.json())
      .then((data) => setTeachers(data)) // Set the teachers data to state
      .catch((err) => console.error('Error fetching teachers:', err));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected date and time:', dateTime);

    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ teacherId, dateTime }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment request sent successfully');
        navigate('/student_dashboard'); // Redirect after submitting
      } else {
        alert(data.message || 'Failed to send appointment request');
      }
    } catch (error) {
      console.error('Error requesting appointment:', error);
    }
  };

  return (
    <div>
      <h2>Request an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Teacher:
          <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date & Time:
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Request Appointment</button>
      </form>
    </div>
  );
};

export default RequestAppointment;

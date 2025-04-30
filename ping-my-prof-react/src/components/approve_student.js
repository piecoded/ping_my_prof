// components/admin/ApproveStudent.js
import React, { useState, useEffect } from 'react';
import '../styles.css'; 
const ApproveStudent = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingStudents();
  }, []);

const fetchPendingStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/auth/admin/pending_students', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log('Fetched data:', data); // ✅ See exactly what you got
  
      if (Array.isArray(data)) {
        setPendingStudents(data);
      } else {
        console.error('Data received is not an array:', data);
        setPendingStudents([]); // fallback
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending students:', error);
      setLoading(false);
    }
  };
  

  const handleApprove = async (studentId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/auth/admin/approve_student/${studentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchPendingStudents(); // refresh the list
      } else {
        alert(data.message || 'Failed to approve student');
      }
    } catch (error) {
      console.error('Error approving student:', error);
    }
  };

  const handleDeny = async (studentId) => {
    const confirmDeny = window.confirm('Are you sure you want to deny this student?');
    if (!confirmDeny) return;
  
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/auth/admin/approve_student`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId, approve: false })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        fetchPendingStudents(); // refresh list
      } else {
        alert(data.message || 'Failed to deny student');
      }
    } catch (error) {
      console.error('Error denying student:', error);
    }
  };
  

  if (loading) return <p>Loading pending students...</p>;

  return (
    <div className="approve-student">
      <h2>Approve Student Registrations</h2>
      {pendingStudents.length === 0 ? (
        <p>No pending students.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingStudents.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td style={{ display: 'flex', gap: '10px' }}>
  <button className="approve-btn" onClick={() => handleApprove(student._id)}>Approve</button>
  <button className="deny-btn" onClick={() => handleDeny(student._id)}>Deny</button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveStudent;

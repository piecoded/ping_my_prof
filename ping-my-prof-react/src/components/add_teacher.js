import React, { useState } from 'react';
import InputField from '../components/common/InputField'; // adjust path if needed

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('http://localhost:5000/api/auth/admin/add_teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error adding teacher');
      }

      setMessage(data.message);
      setFormData({ name: '', email: '', password: '', department: '' });

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='page-content'>
      <div className="form-container">
      <h2>Add New Teacher</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <InputField 
          label="Name"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputField 
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField 
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputField 
          label="Department"
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <button type="submit">Add Teacher</button>
      </form>
    </div>
    </div>
  );
};

export default AddTeacher;

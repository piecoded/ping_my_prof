// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './common/InputField'; // ✅ Import your reusable component
import '../styles.css'; // ✅ Your global styles

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Admin login response:', data);

      if (response.ok) {
        localStorage.setItem('adminToken', data.token); // 🔥 Store a separate admin token
        navigate('/admin_dashboard'); // ✅ Redirect to admin dashboard
      } else {
        alert(data.message || 'Admin login failed');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className='page-content'>

    <div className="form-container">
      <h2>Admin Login</h2>
      <form id="adminLoginForm" onSubmit={handleSubmit}>
        <InputField
          label="Admin Email"
          type="email"
          id="adminEmail"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Password"
          type="password"
          id="adminPassword"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
    </div> </div>
  );
};

export default AdminLogin;

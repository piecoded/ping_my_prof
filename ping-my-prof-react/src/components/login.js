import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; 
import { Link } from 'react-router-dom';
import InputField from './common/InputField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role is student
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }), // include role
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);

        if (role === 'student') {
        if (data.user.status !== 'approved') {
          alert('Your registration is not approved yet.');
        } else {
          navigate('/student_dashboard');
        }
      } else if (role === 'teacher') {
        navigate('/teacher_dashboard');
      }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong');
  }
};

  return (
    <div className='page-content'>
    <div className="form-container">
      <h2>Login</h2>

      {/* Role Toggle Tabs */}
      <div className="role-toggle">
        <button 
          type="button" 
          className={role === 'student' ? 'active' : ''} 
          onClick={() => handleRoleChange('student')}
        >
          Student
        </button>
        <button 
          type="button" 
          className={role === 'teacher' ? 'active' : ''} 
          onClick={() => handleRoleChange('teacher')}
        >
          Teacher
        </button>
      </div>

      <form id="loginForm" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          id="loginEmail"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Password"
          type="password"
          id="loginPassword"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/student_register">Register Here</Link></p>
    </div>
    </div>
  );
};

export default Login;

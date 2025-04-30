import React, { Component } from 'react';
import '../styles.css'; 
import { Link } from 'react-router-dom';
import InputField from './common/InputField';

class StudentRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password } = this.state;
    const role = 'student';
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || 'Registration failed');
      } else {
        alert('Registration request sent. Please wait for admin approval.');
        // Optionally redirect to login
        setTimeout(() => window.location.href = '/login', 3000);  // Redirect after a brief delay
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Something went wrong');
    }
  };

  render() {
    return (
      <div className='page-content'>

      <div className="form-container">
        <h2>Register as a Student</h2>
        <form id="registerForm" onSubmit={this.handleSubmit}>

          <InputField
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

<InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        {this.state.message && <p>{this.state.message}</p>}

        <p>Already have an account? <Link to="/login">Login Here</Link></p>
      </div>
      </div>

    );
  }
}

export default StudentRegister;

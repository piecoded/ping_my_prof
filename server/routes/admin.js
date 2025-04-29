const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authMiddleware');

// Add Teacher - Admin Only
router.post('/admin/add-teacher', authenticate, async (req, res) => {
  try {
    // Check if the requester is actually an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add teachers' });
    }

    const { name, email, password, department } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new teacher
    const newTeacher = new User({
      name,
      email,
      password: hashedPassword,
      role: 'teacher', // Set role to 'teacher'
      department
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher added successfully' });

  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

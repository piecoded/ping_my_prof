// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// const JWT_SECRET = 'supersecretkey'; // Ideally from .env
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role, status: 'pending' });
    await user.save();

    res.status(201).json({ message: 'Registration request sent. Please wait for admin approval.' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    console.log("Login request received:", req.body); // Log incoming data
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: 'Incorrect role selected. Please choose the correct role.' });
    }

    // Check for student status if role is student
    // if (user.role === 'student' && user.status !== 'approved') {
    //   return res.status(403).json({ message: 'Your registration is not approved yet.' });
    // }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    console.log("Login successful, token generated");

    res.json({ token, user: { name: user.name, email: user.email, role: user.role, status: user.status } });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@pingmyprof.com';
const ADMIN_PASSWORD = 'admin123'; // You can later hash this if you want

// Admin login route (DIFFERENT path!)
router.post('/admin/login', (req, res) => {   
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Admin Credentials' });
  }
});

const authenticate = require('../middleware/authMiddleware');

// Admin adds a teacher
router.post('/admin/add_teacher', authenticate, async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Only allow admin users to add teachers
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can add teachers.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

    // Create new teacher
    const newTeacher = new User({
      name,
      email,
      password: hashedPassword, 
      department,
      role: 'teacher'
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin approves a student registration
router.post('/admin/approve_student', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can approve students.' });
  }

  const { studentId, approve } = req.body;

  try {
    const student = await User.findById(studentId);

    if (!student || student.status !== 'pending') {
      return res.status(400).json({ message: 'Student not found or already processed.' });
    }

    if (approve) {
      student.status = 'approved'; // Mark as approved
    } else {
      student.status = 'denied'; // Mark as denied (optional)
    }

    await student.save();

    res.status(200).json({ message: `Student ${approve ? 'approved' : 'denied'} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin views all pending students
router.get('/admin/pending_students', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can view pending students.' });
  }

  try {
    const pendingStudents = await User.find({ role: 'student', status: 'pending' }).select('-password');
    res.status(200).json(pendingStudents);
  } catch (error) {
    console.error('Error fetching pending students:',error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve a student
router.put('/admin/approve_student/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.status = 'approved';  // 👈 update status, not approved: true
    await student.save();

    res.json({ message: 'Student approved successfully' });
  } catch (error) {
    console.error('Error approving student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

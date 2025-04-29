// routes/teachers.js
const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const authenticate = require('../middleware/authMiddleware'); // Middleware to authenticate the user
const router = express.Router();

// Get a list of teachers
router.get('/', authenticate, async (req, res) => {
  try {
    // Fetch teachers from the database (filter by role 'teacher')
    const teachers = await User.find({ role: 'teacher' }).select('name _id'); // You can also select other fields like email if needed

    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching teachers' });
  }
});

module.exports = router;

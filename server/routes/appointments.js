// routes/appointments.js
const express = require('express');
const Appointment = require('../models/Appointment');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Student requests an appointment
router.post('/', authenticate, async (req, res) => {
  const { teacherId, dateTime } = req.body;
  const studentId = req.user.id;

  try {
    // Validate the input
    if (!teacherId || !dateTime) {
      return res.status(400).json({ message: 'Teacher and date/time are required' });
    }

    // Create the appointment
    const appointment = new Appointment({
      student: studentId,
      teacher: teacherId,
      dateTime: new Date(dateTime),  // Convert to Date object
      status: 'pending',
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment request sent successfully', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating appointment request' });
  }
});

// Teacher approves or denies an appointment
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // status could be 'approved' or 'denied'
    const teacherId = req.user.id;
  
    try {
      // Find the appointment
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      // Check if the teacher is the one assigned to the appointment
      if (appointment.teacher.toString() !== teacherId) {
        return res.status(403).json({ message: 'You are not authorized to approve/deny this appointment' });
      }
  
      // Update the status
      appointment.status = status;
      await appointment.save();
  
      res.status(200).json({ message: `Appointment ${status} successfully`, appointment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating appointment status' });
    }
  });
  
  // Teacher fetches their pending appointments
router.get('/my_appointments', authenticate, async (req, res) => {
  const teacherId = req.user.id; // Logged-in teacher

  try {
    const appointments = await Appointment.find({ 
      teacher: teacherId,
      status: 'pending' 
    }).populate('student', 'name email'); // populate student info if you want

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Student fetches their own appointments
router.get('/my_student_appointments', authenticate, async (req, res) => {
  const studentId = req.user.id;

  try {
    const appointments = await Appointment.find({ 
      student: studentId 
    }).populate('teacher', 'name email');

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student appointments' });
  }
});


  module.exports = router;
  

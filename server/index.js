const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticate = require('./middleware/authMiddleware');

require('dotenv').config(); // Load .env variables

const authRoutes = require('./routes/auth');
const teachersRoutes = require('./routes/teacher');
const appointmentsRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teacher', teachersRoutes);
app.use('/api/appointments', appointmentsRoutes);

app.get('/', (req, res) => {
  res.send('PingMyProf API running');
});
// '/dashboard' will ONLY work if you send a valid token
// app.get('/dashboard', authenticate, (req, res) => {
//   res.json({ message: `Welcome, your user ID is ${req.user.id}` });
// });
app.get('/student_dashboard', authenticate, (req, res) => {
  // Logic for fetching student dashboard data
  res.json({ message: 'Student Dashboard' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

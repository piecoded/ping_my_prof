import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import FAQ from './components/FAQ';
import Login from './components/login'; // you can create these pages later
import StudentRegister from './components/student_register';
import StudentDashboard from './components/student_dashboard';
import TeacherDashboard from './components/teacher_dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminDashboard from './components/admin_dashboard';
import AdminLogin from './components/admin_login';
import AddTeacher from './components/add_teacher';
import ApproveStudent from './components/approve_student';
import RequestAppointment from './components/request_appointment';
import ViewAppointments from './components/view_appointments';
import "./styles.css";
function App() {
  return (
   <div id="root">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />

         <Route path="/login" element={<Login />} />

        <Route path="/student_register" element={<StudentRegister />} />

        <Route path="/student_dashboard" element={<ProtectedRoute>  <StudentDashboard />  </ProtectedRoute>} />

        <Route path="/teacher_dashboard" element={<ProtectedRoute>  <TeacherDashboard />  </ProtectedRoute>} />
              
        <Route path="/admin_login" element={<AdminLogin />} />

        <Route path="/admin_dashboard" element={  <ProtectedAdminRoute> <AdminDashboard />  </ProtectedAdminRoute>}  />

        <Route path="/add_teacher" element={<AddTeacher />} />

        <Route path='/approve_student' element={<ApproveStudent/>} />

        <Route path='/request_appointment' element={<RequestAppointment/>} />

        <Route path='/view_appointments' element={<ViewAppointments/>} />


      </Routes>
    </Router>
    </div>
  );
}

export default App;
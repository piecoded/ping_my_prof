// // components/common/Sidebar.js (with toggle)
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../styles.css';

// const Sidebar = ({ role }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className='page-content'>

//     <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//       <button className="toggle-btn" onClick={toggleSidebar}>
//         {isSidebarOpen ? 'Close' : 'Open'}
//       </button>
//       <h2>{role} Dashboard</h2>
//       <ul>
//         {role === 'admin' && (
//           <>
//             <li><Link to="/add_teacher">Add Teacher</Link></li>
//             <li><Link to="/approve_student">Approve Student</Link></li>
//             <li><Link to="/admin/manage_teachers">Manage Teachers</Link></li>
//             <li><Link to="/admin/view_appointments">View Appointments</Link></li>
//           </>
//         )}
//         {role === 'teacher' && (
//           <>
//             <li><Link to="/teacher/schedule_appointment">Schedule Appointment</Link></li>
//             <li><Link to="/view_appointments" state={{ role: 'teacher' }}>View Appointments</Link></li>
//             <li><Link to="/teacher/messages">Messages</Link></li>
//           </>
//         )}
//         {role === 'student' && (
//           <>
//             <li><Link to="/request_appointment">Request Appointment</Link></li>
//             <li><Link to="/view_appointments" state={{ role: 'student' }}>View Appointments</Link></li>
//             <li><Link to="/student/messages">Messages</Link></li>
//           </>
//         )}
//         <li><Link to="/profile">Profile</Link></li>
//         <li><Link to="/logout">Logout</Link></li>
//       </ul>
//     </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles.css'; // assuming your styles

const Sidebar = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='page-content'>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? '☰' : '☰'}
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h2>{role} Dashboard</h2>
        <ul>
          {role === 'admin' && (
            <>
              <li><Link to="/add_teacher">Add Teacher</Link></li>
              <li><Link to="/approve_student">Approve Student</Link></li>
              <li><Link to="/admin/manage_teachers">Manage Teachers</Link></li>
              <li><Link to="/admin/view_appointments">View Appointments</Link></li>
            </>
          )}
          {role === 'teacher' && (
            <>
              <li><Link to="/teacher/schedule_appointment">Schedule Appointment</Link></li>
              <li><Link to="/view_appointments" state={{ role: 'teacher' }}>View Appointments</Link></li>
              <li><Link to="/teacher/messages">Messages</Link></li>
            </>
          )}
          {role === 'student' && (
            <>
              <li><Link to="/request_appointment">Request Appointment</Link></li>
              <li><Link to="/view_appointments" state={{ role: 'student' }}>View Appointments</Link></li>
              <li><Link to="/student/messages">Messages</Link></li>
            </>
          )}
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

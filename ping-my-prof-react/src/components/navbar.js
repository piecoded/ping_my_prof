import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import bookLogo from '../assets/book.png'; 

class Navbar extends React.Component {
    state = {  } 
    render() { 
        return (<nav>
            <div className="logo">
              <img src={bookLogo} alt="Logo" />
              <span>PingMyProf</span>
            </div>
  
            <div className="hamburger">&#9776;</div>
  
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/admin_login">Admin</Link></li>

            </ul>
          </nav>);
    }
}
 
export default Navbar;
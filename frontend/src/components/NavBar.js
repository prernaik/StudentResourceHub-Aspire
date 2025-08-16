import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>Logo</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/login-signup">Login/Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
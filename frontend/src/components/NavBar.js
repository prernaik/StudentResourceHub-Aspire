// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <h1 className="logo">Student Resource Hub</h1>
        <nav className="nav">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/upload" className="nav-link">Upload</NavLink>
          <NavLink to="/notes" className="nav-link">Notes</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

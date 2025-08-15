// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Notes from './pages/notes';
import NoteDetails from './pages/NoteDetails';
import Upload from './pages/upload';
import About from './pages/about';
import './index.css';

export default function App() {
  return (
    <Router>
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

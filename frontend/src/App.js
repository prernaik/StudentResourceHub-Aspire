import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import LoginSignupPage from './pages/LoginSignupPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderBoardPage';
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </Router>
  );
}
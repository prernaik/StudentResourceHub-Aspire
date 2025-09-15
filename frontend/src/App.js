import React from 'react';
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css';
import LoginSignupPage from './pages/LoginSignupPage';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignupPage />} />
        <Route path="/login-signup" element={<LoginSignupPage />} />
        <Route path="/home" element={<Home />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;

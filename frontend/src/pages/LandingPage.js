import React from 'react';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

const LandingPage = () => {
  return (
    <div>
      <div className="hero">
        <h1>By Students, For Students</h1>
        <p>A platform to share and access educational resources.</p>
        <button>Get Started</button>
      </div>
      <div className="featured-resources">
        <h2>Featured Resources</h2>
        <Carousel />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    { id: 1, title: 'Resource 1', type: '📄' },
    { id: 2, title: 'Resource 2', type: '🎥' },
    { id: 3, title: 'Resource 3', type: '📝' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide}>Previous</button>
      <div>
        <h3>{items[currentIndex].title}</h3>
        <span>{items[currentIndex].type}</span>
      </div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
import React from 'react';
import './Slider.css';

const Slider = ({ children }) => {
  return (
    <div className="slider">
      <div className="slider__container">
        <div className="slider__track">{children}</div>
      </div>
    </div>
  );
};

export default Slider;

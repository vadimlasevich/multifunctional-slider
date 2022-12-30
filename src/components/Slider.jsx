import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { ReactComponent as Arrow } from '../images/arrow.svg';
import './Slider.css';

const Slider = ({ children }) => {
  const [slides, setSlides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [wigthSlide, setWigthSlide] = useState(null);
  const [isDisabledNextBtn, setIsDisabledNextBtn] = useState(false);
  const [isDisablePrevtBtn, setIsDisabledPrevBtn] = useState(true);

  const windowSliderRef = useRef();

  useEffect(() => {
    setSlides(Children.map(children, (child) => cloneElement(child)));
  }, []);

  useEffect(() => {
    setWigthSlide(windowSliderRef.current.offsetWidth);

    const handleResizeSlide = () => {
      setWigthSlide(windowSliderRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResizeSlide);

    return () => window.removeEventListener('resize', handleResizeSlide);
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      setIsDisabledPrevBtn(false);
    } else {
      setIsDisabledPrevBtn(true);
    }

    if (offset === getMaxWigthContainer() && offset !== 0) {
      setIsDisabledNextBtn(true);
    } else {
      setIsDisabledNextBtn(false);
    }
  }, [offset]);

  const getMaxWigthContainer = () => {
    let maxCurrentWidth = -(wigthSlide * (slides.length - 1));

    return maxCurrentWidth;
  };

  const handleRollPrevSlider = () => setOffset((prevWidth) => Math.min(prevWidth + wigthSlide, 0));

  const handleRollNextSlider = () => {
    setOffset((prevWidth) => {
      let currentWidth = prevWidth - wigthSlide;

      return Math.max(currentWidth, getMaxWigthContainer());
    });
  };

  return (
    <div className="slider">
      <button className="slider__btn slider__btn-prev" onClick={handleRollPrevSlider} disabled={isDisablePrevtBtn}>
        <Arrow className="arrow-btn" />
      </button>
      <div className="slider__container" ref={windowSliderRef}>
        <div className="slider__track" style={{ transform: `translateX(${offset}px)` }}>
          {children}
        </div>
      </div>
      <button className="slider__btn slider__btn-next btn-rotate" onClick={handleRollNextSlider} disabled={isDisabledNextBtn}>
        <Arrow className="arrow-btn" />
      </button>
    </div>
  );
};

export default Slider;

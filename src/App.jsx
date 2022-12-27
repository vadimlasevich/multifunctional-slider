import React from 'react';
import Slider from './components/Slider';

const App = () => {
  return (
    <Slider>
      <div className="slide">Slide-1 Content</div>
      <div className="slide">Slide-2 Content</div>
      <div className="slide">Slide-3 Content</div>
      <div className="slide">Slide-4 Content</div>
    </Slider>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const TrailerSlider = () => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    axios.get('/api/movies/latest-trailers')
      .then(response => setTrailers(response.data))
      .catch(error => console.error(error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div>
      <h2>최신 영화 예고편</h2>
      <Slider {...settings}>
        {trailers.map((trailer, index) => (
          <div key={index} className="px-4">
            <a 
              href={`https://www.youtube.com/watch?v=${trailer.key}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div style={{ background: '#ddd', height: '150px', textAlign: 'center', lineHeight: '150px' }}>
                🎬 {trailer.title}
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrailerSlider;

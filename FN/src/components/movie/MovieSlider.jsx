// src/components/movie/MovieSlider.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';
import '../../css/movie/MovieSlider.css';

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies/latest')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="movie-slider">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className='slide'
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdropPath})`,
              }}
            >
              <h2 className='movieT'>{movie.title}</h2>
              {/* <p style={{ maxWidth: '600px', marginTop: '1rem' }}>{movie.overview}</p> 영화 줄거리*/} 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;

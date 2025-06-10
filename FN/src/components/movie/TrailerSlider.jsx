import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../css/movie/TrailerSlider.css';
import { Link } from 'react-router-dom';

const TrailerList = ({ title, category }) => {
  const [movies, setMovies] = useState([]);
  const scrollRef = useRef(null); // 스크롤 컨테이너 참조

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movies/category/${category}`);
        setMovies(response.data);
      } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMovies();
  }, [category]);

  // 스크롤 이동 함수
  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="movie-category2">
      <h2>{title}</h2>
      <div className="slider-container">
        <button className="scroll-button left" onClick={() => scroll('left')}>{'<'}</button>

        <div className="movie-category__list2" ref={scrollRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card2">
            <Link to={`/movies/${movie.id}`} className='movie2'>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster2"
              />
              <h3 className='slide-title'>{movie.title}</h3>
            </Link>
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')}>{'>'}</button>
      </div>
    </div>
  );
};

export default TrailerList;

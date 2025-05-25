import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/home/Home.css';
import MovieList from '../movie/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`
        );
        setMovies(res.data.results.slice(0, 5)); // 최대 5개만 보여주기
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      {movies.length > 0 && (
        <div
          className="carousel-slide"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[current].backdrop_path})`,
          }}
        >
          <div className="carousel-overlay">
            <h3>최신 상영작</h3>
            <h2>{movies[current].title}</h2>
          </div>
          <button className="carousel-btn left" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-btn right" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      )}
        <div className="home-section">
            <MovieList
                title="인기 영화"
                apiUrl="https://api.themoviedb.org/3/movie/popular"
            />
        </div>
    </div>
  );
};

export default Home;

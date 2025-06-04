import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/movie/MovieList.css';

const MovieList = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movies/${category}`);
        setMovies(response.data);
      } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    

    fetchMovies();
  }, [category]);

  return (
    <div className="movie-category">
      <h2>{title}</h2>
      <div className="movie-category__list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

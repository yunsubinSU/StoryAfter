import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieStyle.css';

const MovieList = ({ title, apiUrl }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          language: 'ko',
          region: 'KR',
        },
      });
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [apiUrl]);
  


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
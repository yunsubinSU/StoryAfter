import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/movie/MovieList.css';
import { Link } from 'react-router-dom';

const MovieList = ({ title, category }) => {
  const [movies, setMovies] = useState([]);

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

  return (
    <div className="movie-category">
      <h1>{title}</h1>
      <div className="movie-category__list3">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card3">
            <Link to={`/movies/${movie.id}`} className='movie3'>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster3"
            />
            <h3 className='Listmovietitle'>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

import React from 'react';
import MovieList from '../movie/MovieList';
import '../../css/movie/Movie.css';

function Movie() {
  return (
    <div className="Movie">
      <header className="App-header">
      </header>
      <MovieList title="인기 영화" apiUrl="https://api.themoviedb.org/3/movie/popular" />
      <MovieList title="현재 상영 중인 영화" apiUrl="https://api.themoviedb.org/3/movie/now_playing" />
      <MovieList title="방영 예정작" apiUrl="https://api.themoviedb.org/3/movie/upcoming" />
    
    </div>
  );
}

export default Movie;
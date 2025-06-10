import React from 'react';
import '../../css/movie/Movie.css';
import MovieList from '../movie/MovieList';

function Movie() {
  return (
    <div className="Movie">
      <header className="App-header">
      </header>
      <MovieList title="인기 영화" category="popular" />
      <MovieList title="현재 상영 중인 영화" category="now_playing" />
      <MovieList title="방영 예정작" category="upcoming" />
    </div>
  );
}

export default Movie;
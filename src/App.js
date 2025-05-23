import React from 'react';
import MovieList from './MovieList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HYELONG</h1>
      </header>
      <MovieList title="인기 영화" apiUrl="https://api.themoviedb.org/3/movie/popular" />
      <MovieList title="현재 상영 중인 영화" apiUrl="https://api.themoviedb.org/3/movie/now_playing" />
      <MovieList title="방영 예정작" apiUrl="https://api.themoviedb.org/3/movie/upcoming" />
    
    </div>
  );
}

export default App;
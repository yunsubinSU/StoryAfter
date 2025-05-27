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

        {/* 여기는 예고편영상을 넣을 생각이다. */}
        <div className="home-section">
            <a className='ex-title'>실시간 영화</a>
            <div className='ex-movie'>
              영상은 이부분에 들어갈거다.          
            </div>    
        </div>

        {/* 영화 하나 랜덤으로 해서 해당 영화 보여주기 */}
        <div className='movie-review'>
          <a>인기 영화 리뷰</a>
          <a>여기는 인기영화를 따로 빼서 / 여기에 맞는 리뷰를 뽑아오는 것을 만들것이다.</a>
        </div>

        {/* 채팅방, 문의 사항, 공지 사항을 선택했을 때 그 내용이 나오게 만들기 */}
        <div className='chat-more'>
        </div>
    </div>
  );
};

export default Home;

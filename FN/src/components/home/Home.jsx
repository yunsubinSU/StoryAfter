import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/home/Home.css';
import MovieSlider from '../movie/MovieSlider';
import TrailerSlider from '../movie/TrailerSlider';
import ReviewOne from '../User/ReviewOne';
import Tab from './Tab';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8090/api/movies/latest')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);



  return ( 
    <div className="carousel-container">
        <MovieSlider />
        <div className="home-section">
            <h2 className='ex-title'>실시간 영화</h2>
          <div className='ex-movie'>
          <TrailerSlider category="now_playing" />
          </div>    
        </div>

        {/* 영화 하나 랜덤으로 해서 해당 영화 보여주기 */}

          <ReviewOne></ReviewOne>

        {/* 채팅방, 문의 사항, 공지 사항을 선택했을 때 그 내용이 나오게 만들기 */}
          <Tab/>

    </div>
  );
};

export default Home;

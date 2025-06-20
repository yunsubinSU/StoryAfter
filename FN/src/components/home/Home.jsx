import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/home/Home.css';
import MovieSlider from '../movie/MovieSlider';
import TrailerSlider from '../movie/TrailerSlider';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies/latest')
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
        <div className='movie-review'>
          <a>인기 영화 리뷰</a>
          <a>여기는 인기영화를 따로 빼서 / 여기에 맞는 리뷰를 뽑아오는 것을 만들것이다.</a>
        </div>

        {/* 채팅방, 문의 사항, 공지 사항을 선택했을 때 그 내용이 나오게 만들기 */}
        <div className='chat-more'>
          <div id='tab-btn'>
                  <button onClick={()=>setTab(1)}>공지사항</button>
                  <button onClick={()=>setTab(2)}>갤러리</button>
              </div>
              <div id='tab-content'>
                  {
                      tab === 1 ? <div id='notice'>공지사항</div>:''
                  }
                  {
                      tab === 2 ? <div  id='gallery'>갤러리</div>:''
                  }
              </div>
        </div>
    </div>
  );
};

export default Home;

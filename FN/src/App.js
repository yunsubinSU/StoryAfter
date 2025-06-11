import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import Movie from './components/movie/Movie';
import Login from './components/login/Login';
import KakaoLogin from "./components/api/KakaoLogin";
import Search from "./components/home/Search";
import MovieDetail from "./components/movie/MovieDetail";
import Join from './components/login/Join'
import Logout from './components/login/Logout'
import Main from './components/home/Main'
import User from './components/User/User'
import Review from './components/User/ReviewForm'

function App() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser({ username: storedUser });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div className="App">
     <BrowserRouter>
        <Header user={user} onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies/:id" element={<MovieDetail user={user} />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User/>  } />
          <Route path="/join" element={<Join />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/review" element={<Review />} />
        
        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
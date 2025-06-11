import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ReviewProvider } from "./components/User/ReviewContext";
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
import User from './components/User/User'
import Review from './components/User/ReviewForm'
import ChatRoom from './components/User/ChatRoom'
import ChatRoomCome from './components/User/ChatRoomCome'
import ReviewList from './components/User/ReviewList'
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
  <Header user={user} onLogout={handleLogout} />
  
  <ReviewProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movies/:id" element={<MovieDetail user={user} />} />
      <Route path="/user" element={<User />} />
      <Route path="/join" element={<Join />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/review" element={<Review />} />
      <Route path="/reviewlist" element={<ReviewList />} />
      <Route path="/chatroom" element={<ChatRoom />} />
      <Route path="/chatroomcome" element={<ChatRoomCome />} />
    </Routes>
  </ReviewProvider>

  <Footer />
</BrowserRouter>

    </div>
  );
}

export default App;
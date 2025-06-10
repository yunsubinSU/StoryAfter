import './App.css';
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

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/kakaoLogin" element={<KakaoLogin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User/>  } />
          <Route path="/join" element={<Join />} />
          <Route path="/logout" element={<Logout />} />
        
        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
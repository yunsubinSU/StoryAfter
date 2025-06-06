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
        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
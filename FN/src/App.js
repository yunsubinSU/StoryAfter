import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import Movie from './components/movie/Movie';
import Login from './components/login/Login';
import KakaoLogin from "./components/api/KakaoLogin";

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
        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
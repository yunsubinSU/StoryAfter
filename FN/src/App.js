import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Home from './components/home/Home'
import Movie from './components/movie/Movie'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
        <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
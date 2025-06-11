import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/home/Search.css'; // 스타일은 별도 CSS로 관리 추천
import { Link } from 'react-router-dom';

const MOVIES_PER_PAGE = 30;

function Search() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) return;

      try {
        const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('검색에 실패했습니다');
        const data = await response.json();
        setMovies(data);
        setError('');
        setPage(1); 
      } catch (err) {
        setError(err.message);
      }
    };

    searchMovies();
  }, [query]);

  const startIdx = (page - 1) * MOVIES_PER_PAGE;
  const paginatedMovies = movies.slice(startIdx, startIdx + MOVIES_PER_PAGE);
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);

  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));
  const handleNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

  return (
    <div className="search-page">
      <h2>“{query}” 검색 결과</h2>
      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {paginatedMovies.map((movie, idx) => (
          <div key={idx} className="movie-card1">
            <Link to={`/movies/${movie.id}`} className='movie2'>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
              />
              <h4>{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          이전
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}

export default Search;

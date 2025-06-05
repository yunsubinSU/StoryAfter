import '../../css/common/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png';
import { useState } from 'react';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div id='header'>
      <div className='header-left'>
        <Link to="/" className='header-title'><h1>Story After</h1></Link>
        <Link to="/movie" className='movie1 SMN_effect-3'>MOVIE</Link>
        <Link className='movie1 SMN_effect-3'>CHAT</Link>
      </div>

      <div className='header-right'>
        <form className='search-box' onSubmit={handleSearch}>
          <input
            className='search-txt'
            type='text'
            placeholder='검색어를 입력해주세요'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='search-btn' type='submit'>
            <img className='search-img' src={searchIcon} alt='검색' />
          </button>
        </form>
        <Link to="/login" className='login'>LOGIN</Link>
      </div>
    </div>
  );
}

export default Header;

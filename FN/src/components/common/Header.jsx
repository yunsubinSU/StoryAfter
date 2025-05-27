import '../../css/common/Header.css';
import {Link} from 'react-router-dom';
import searchIcon from '../../img/search.png';

function Header(){
    return(
        <div id='header'>
            <div className='header-left'>
                <Link to="/" className='header-title'><h1>Story After</h1></Link>
                <Link to="/movie" className='movie1 SMN_effect-3'>MOVIE</Link>
                <Link className='movie1 SMN_effect-3'>CHAT</Link>
            </div>

            <div className='header-right'>
                <from className='search-box' action="" method="get">
                    <input className='search-txt' type='text' name='' placeholder='검색어를 입력해주세요'></input>
                    <button className='search-btn' type='submit'>
                        <img className='search-img' src={searchIcon} alt='검색' />
                    </button>
                </from>
                <Link to="/login" className='login'>LOGIN</Link>
            </div>
        </div>
    )
}

export default Header;


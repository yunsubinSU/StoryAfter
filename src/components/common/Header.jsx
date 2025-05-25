import '../../css/common/Header.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <div id='header'>
            <Link to="/" className='header-title'>
                <h1>Story After</h1>
            </Link>
            <nav>
                <ul className='menu'>
                    <li> <Link to="/movie" className='movie'>movie</Link> </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;


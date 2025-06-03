import axios from 'axios'
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import '../../css/login/Login.css';
//import api from '../api/axiosConfig'; // 새로운 api 인스턴스 임포트

const Login  = ()=>{
        const [message,setMessage] = useState();

        const KakaoLogin = ()=>{
            try{
                const reqFunc = async ()=>{
                    const response = await axios.get(`http://localhost:8080/kakao/getCode`)
                    console.log(response.data);
                }
                reqFunc();

            }catch(error){

            }
        }
<<<<<<< HEAD
    };

    const handleLogin = () => {
        alert('로그인 완료');
    };
=======
    
//     const [username ,setUsername] = useState()
//     const [password ,setPassword] = useState()
//     const navigate = useNavigate();
//   // useEffect에서 API 검증 호출
//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         // 토큰 유효성 검증을 위한 별도 엔드포인트 호출
//         const resp = await axios.get("http://localhost:8090/validate", {
//           withCredentials: true,
//         });
//         console.log("토큰 검증 성공:", resp);
//         navigate("/"); // 성공 시 / 경로로 이동
//       } catch (error) {
//         console.log("토큰 검증 실패:", error);
//         // 비정상 응답 시 아무 동작도 하지 않음 (현재 페이지 유지)
//       }
//     };
//     validateToken();
//   }, [navigate]); // navigate를 의존성 배열에 추가
>>>>>>> 2e7cdeeaf86d52eb5c3b014d384af1c652934ce9

    return (
        <>  
            <div>
                <a className='login1'>아이디 <input type="text" name="username" className='bank1' /></a><br />
                <a className='login1'>비밀번호 <input type="password" name="password" className='bank2'/></a><br />
                <button className='login3' >로그인</button>
            </div>
            <ul className='list'>
                <li>아이디 찾기</li>|
                <li>비밀번호 찾기</li>|
                <li>회원 가입</li>
            </ul>

            <div className='social'>
                <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwgHBw0HBwcHBw0HBwcHDQ8IDgcNFREWIhUdHx8YHSggGCYtGxYVLT0jJSkrLi46IyszOD8tNyk5LysBCgoKDQ0OGA8QFSskGhkrKystMDM1MzcrNy0rLSsrLS43KystNzAxKzctNy0rKy0tKy0rKysrKzctKy0rKysrLf/AABEIAN0A5AMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQYHBQIEA//EADkQAQABBAABBQ0IAgMAAAAAAAARAQIDBAUGBzFxshITFBUWITVBUlR0k9EiUVNhgZHC0iNCJEOx/8QAGwEBAAIDAQEAAAAAAAAAAAAAAAEEAwUGBwL/xAA1EQEAAQIDAwkGBgMAAAAAAAAAAQIDBBExBRLBBhQhQVFhcpHREzIzNFKCFRYiQlOhcYHw/9oADAMBAAIRAxEAPwDrNQ8qAQACQQAkECQQAkEAAkAEAAkAAAAAEAAkAAARIkkCQJAkCQJAkCQJAkCQJAkCQJAkCQJAAkCQJAkCQAAJABCQAAAAAAAAAAAAQACQEggAAAQACQAAQCQBAkAAAAAAAAAAAAAAAAAAAAAAAAAAABEpSSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSCBIAAAAAAAAAAAAAAAAAAAAAAAAAAACEgAABIEgSAAAABIEgSBIEgASBIEgSBIEgSBIEgSBIIkEJSIAABIAAA7/khvezr/Moy+wrbn8BxnZHmeSG97Ov8yh7Cs/AcZ2R5nkhvezr/ADKHsKz8BxnZHm8Z+Su7gxX5rrMV1uOyt91Md9Lq1pRE2a4jPJ8XNiYuimapiOjvcNjakAAB1OCcEy8Z7/4PfgxeD9xS/v3dU7rupjop+T7otzXo2GB2dcxm9uTEbuWvfm6nkTs/jaX73/1ZOb1drYfl3EfXT/foeROz+Lpfvf8A1Ob1dp+XcR9dP9+h5E7P42l+9/8AU5vV2n5dxH10/wB+jn8Z5PZuEYLM+e/XyW5MtMNKYa3VrSsVr66fk+K7U0xnKljdlXcJRFddUTEzl0Z+jjsbWAAAAAAAIEgAAAAAAhsrZPUAAAGfcseC+A5/DtalfBNm7/JbbTza+T6VU71vdnONHGba2f7Gv21Efoq17p9JVthaMABc+bvo4l14P5rOH63Ucm9Lv28VyWXTgAKvzgejdb46nYuYL/uuf5RfL0eLhKhKjkAAAAAAAEJSAAAAAACGzNi9PAAAfjt61m3gya2elL8Waytl9tUTETGUsd61Rdom3XGcSy3jPDb+FbmTVyzdbT7WDL6stnqqo10zTOTgMbhK8Ldm3Vp1T2w+F8qgC583XRxLrwfzWMP1uo5OaXft4rmsumAAVbnB9G63x1OxcwX/AHWg5Q/L0eLhKhKrkAAAAAAAEAAAAAAAA2dsXpwAAADk8o+D28X0646Rbs4Zya2Toi77uqrHco3o72v2jgacVa3f3RozDJZdivvxZKXWZMd1bL7LvNW2tOlScHVTNMzTVGUw8j5XTm56OJdeD+axh+t1HJzS79vFc1l0wACrc4Xo3W+Op2LmC/7rQcofl6PFwlQVVyAAAAAAACEpAAAAAAAbQ2D00AAAABT+W/BO+W14tq0p3eO3/m2W/wC9vtfp61e9R+6HN7b2fvRzi3HTHvevqo6u5Zdebno4l14P5rFjrdPyc0u/bxXNYdMAAq3OF6N1vjqdi5hv6NByh+Xo8XCVAVXIgAAAAAAIkSSBIEgSBIEgJQ2lfemgAAAAIrSl1K23RWlaRWlfPNBExn0SzPlXwWvCdvvmGlfAtm6t2Cv4V3rtU7lG7Pc4jauA5tc3qfcq07u70dnm46OJdeD+bJY62z5O6Xft4rosOlAAVXnD9G63x1Oxcw3tGh5Q/L0eLhKgKrkSQJAkACQJABCQAAAAAACW1L70wAABzeAcVt4vpW7FsW5rK972cVP+u/6PiirejNTwOLpxNqK41jomO90n2uAPl4noY+JamTU2KTZkp5rqdOO71Vo+aqYqjKWDE4ejEW5t16SrvIjSycP2eL6exSMuG/BSadF9PtxWn5MdqJiZiWn2LYrsV3rdesbvHpWxmb8ABVecT0ZrfHU7FzDe0aHlB8CjxcJZ+rORAAAAAAAeZSkkEyBIIkCQTIEhLa156WAAAyjk/wAXu4Pv0z+e7XyXd72sftWT09dFOirdnNweAxk4W9vftnon/DVMOW3NjszYq25MWWyl+O+3z0upXoXHdUV010xVTOcS9j6AeaW0pdW+lKd3dbS26711pSY/9qIyjPPrehIACqc4vozW+Op2LmG9o0PKD4FPi4Sz+VdyRIIkCQTIIkCQJBAkAAAAAAES21eelgAAMTr0166qLzadVy5Ccc73fThGzX7F9a3aV93+l3rt/Xzs1qvL9Mui2Jjsp5vXPROnovSw6cAAAABVOcX0ZrfH07FzFe0aHlB8CnxcJZ6rOTAAAAAAAQlIAAAAAAIlty69KAAAYlXpr11Unm06lt1bbqXW1rbdbWl1t1vmrbUImYnOGpcleN04xpU75WlN3WpSzZs9r7rv1WqKt6Hb7Nx0Ym10+9Tr6u2+2yAAAAVPnG9Gavx9OxcxXtGi2/8AAp8XCWeq7kwAAAAAAESBIEgAAASAkbeuPSQAAGI16a9dVJ5vOqJEPu4NxO/hW7i28M1pbXuc2P1ZrPXR9UzlOa1hMVXhrsXKf9/4a1pbVm7rYtvXr3eHPZ3dly1E5xm7u1dpu0Rconol+6WQAABU+cf0Zq/H07FzFd0aLb/wKfFwlnkq7kyQJAkCQJAkCQQlIAAAAAAEtwXHpAAADEK9Neuqm84nVAgBaeQ/HfAdnxfs3RqbV/8Ajuur5sGX6VZLdWU5N3sfHeyr9jXP6atO6WjrDrQAAFS5x/Rmr8fTsXMV3Rotv/Ap8XCWeMDlAAAAAAAECQAAAAABKJbL411feNP5tn1Wd6O16Dzmz9ceZ411fedP5tn1N6O05zZ+uPM8a6vvOn82z6m9Hac5s/XHmeNdX3jT+bZ9U70dpzmz9cebG69NetUefzqgAAGjck+U+PY0vB+JZceHa1aUs75mupb4RZ6q9f3s9FfR0us2btOiu1u3asqqe3rj/tXc8dafvOn8y1971Pa2XPMP/JHmeOtP3nT+Zab1Pac8w/8AJHmeOtP3nT+Zab1Pac8w/wDJHmrHL7iGDb4drWaubBnvt3aX3W4rqX1pTuLmO5MTDTbbv2rlmmKKomd7hKiMLmgAAAAAAEJSAAAAAAAgQAAAkSAAAgAQAAAkSAAAAAAAhIAAAAAAAAAAAAAAAAAAAAgEgAAgEggAESJJAkCQJAkCQJAkCQJAkCQJAkCQJAkCQJAkCQJAkCQJAkCQJBCUgAgEgAAgEgAAAAAAgEgAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAABEpSSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSBIEgSCEpAAAAAEAkAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=' className='NAVERIMG'></img>
                <a href="http://localhost:8080/kakao/getCode"><img src='data:image/png;base64,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' className='KAKAOIMG'/></a> <br/>
                <img src='data:image/png;base64,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' className='GOOGLEIMG'></img>
            </div>

            <ul className='social-list'>
                <li className='social-list1'>NAVER</li>
                <li className='social-list2'>KAKAO</li>
                <li className='social-list3'>GOOGLE</li>
            </ul>
        </>
    )
}

export default Login;
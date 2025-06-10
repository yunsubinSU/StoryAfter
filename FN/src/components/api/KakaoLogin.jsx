import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/api/KakaoLogin.css';

const KakaoLogin = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null); // 액세스 토큰을 상태로 관리

    // 로그인 요청
    const kakaoLoginHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/kakao/getCode`);
            console.log("로그인 성공", response.data);

        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };

  
    return (
        <>
            <h1>KAKAO LOGIN</h1>
            <button onClick={kakaoLoginHandler}>로그인 요청</button>

            <button>
                <a href="http://localhost:8090/kakao/logoutWithKakao">로그아웃</a>
            </button>
        </>
    );
};

export default KakaoLogin;

import React, { useState } from 'react';
import '../../css/login/Join.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    birthDate: '',
    email: '',
  });
  const [usernameMessage, setUsernameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // 입력 수정 시 메시지 초기화
    if (e.target.name === 'username') setUsernameMessage('');
    if (e.target.name === 'email') setEmailMessage('');
    if (e.target.name === 'password') setPasswordMessage('');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // 중복 체크 함수 (백엔드에서 아이디, 이메일 중복 확인)
  const checkDuplicate = async () => {
    let isDuplicate = false;

    // 아이디 중복 체크
    const usernameRes = await fetch(`/auth/check-username?username=${encodeURIComponent(form.username)}`);
    if (usernameRes.ok) {
      const { usernameError } = await usernameRes.json();
      if (usernameError) {
        setUsernameMessage(usernameError);
        isDuplicate = true;
      }
    }

    // 이메일 중복 체크
    const emailRes = await fetch(`/auth/check-email?email=${encodeURIComponent(form.email)}`);
    if (emailRes.ok) {
      const { emailError } = await emailRes.json();
      if (emailError) {
        setEmailMessage(emailError);
        isDuplicate = true;
      }
    }

    return isDuplicate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 체크
    if (!validatePassword(form.password)) {
      setPasswordMessage('비밀번호는 특수문자를 포함하여 8자 이상이어야 합니다.');
      setIsSuccess(false);
      return;
    }

    // 중복 체크
    const isDuplicate = await checkDuplicate();
    if (isDuplicate) {
      setIsSuccess(false);
      return;
    }

    // 회원가입 요청
    const res = await fetch('/auth/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    let data;
    try {
      data = await res.json();
    } catch (err) {
      data = { message: res.statusText || '서버 응답 오류' };
    }

    if (res.ok) {
      setUsernameMessage('');
      setEmailMessage('');
      setPasswordMessage('');
      setMessage('회원가입 성공! 로그인페이지로 이동합니다.');
      setIsSuccess(true);
      setForm({ username: '', password: '', birthDate: '', email: '' });

      navigate('/login');
    } else if (res.status === 403) {
      // 중복된 아이디나 이메일일 경우
      setMessage(data.message || '회원가입 실패');
      setIsSuccess(false);
    } else {
      setMessage(data.message || '회원가입 실패');
      setIsSuccess(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="아이디"
          onChange={handleChange}
          value={form.username}
          required
        />
        {usernameMessage && <p className="error">{usernameMessage}</p>}

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
          value={form.password}
          required
        />
        {passwordMessage && <p className="error">{passwordMessage}</p>}

        <input
          name="birthDate"
          type="date"
          onChange={handleChange}
          value={form.birthDate}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="이메일"
          onChange={handleChange}
          value={form.email}
          required
        />
        {emailMessage && <p className="error">{emailMessage}</p>}

        <button type="submit">가입하기</button>
      </form>
      {/* 공통 메시지 (성공 등) */}
      <p className={isSuccess ? 'success' : 'error'}>{message}</p>
    </div>
  );
}

export default SignupPage;

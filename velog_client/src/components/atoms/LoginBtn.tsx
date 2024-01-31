import React, { FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const LoginBtn: FC = () => {
  const navigate = useNavigate();

  // OAuth2 로그인 처리
  const handleLogin = async () => {
    try {
      // 백엔드에 OAuth2 플로우를 시작하도록 요청
      const response = await axios.get('http://localhost:8080/oauth2/authorization/google');
      // 백엔드가 위 GET 요청에 대한 응답으로 토큰을 반환한다고 가정
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/'); // 루트 페이지로 이동
      }
    } catch (error) {
      console.error('로그인 중 에러 발생', error);
    }
  };

  return (
    <GoogleLoginButton onClick={handleLogin}>
      <FcGoogle />
      <span>Google로 로그인</span>
    </GoogleLoginButton>
  );
};

export default LoginBtn;

const GoogleLoginButton = styled.button`
  background-color: #ffffff;
  color: #4285f4;
  padding: 10px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e8e8e8;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #d6d6d6;
    transform: translateY(0);
  }

  span {
    margin-left: 8px;
  }
`;

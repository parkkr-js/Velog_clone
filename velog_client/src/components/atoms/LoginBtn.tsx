import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import theme from "../../styles/theme";

const LoginBtn: React.FC = () => {
  // Google OAuth2 로그인 페이지로 리디렉션
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <GoogleLoginButton onClick={handleLogin}>
      <FcGoogle />
    </GoogleLoginButton>
  );
};

export default LoginBtn;

const GoogleLoginButton = styled.button`
  background-color: ${theme.colors.background3};
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
    background-color: ${theme.colors.text4};
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${theme.colors.text4};
    transform: translateY(0);
  }

  span {
    margin-left: 8px;
  }
`;

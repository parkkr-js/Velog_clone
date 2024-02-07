import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import theme from "../styles/theme";
import { userState } from "../state/atoms/userState";
import { useNavigate } from "react-router-dom";

const RedirectionAfterLoginPage: FC = () => {
  const API = process.env.REACT_APP_API_URL;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${API}/api/userinfo`, {
      credentials: "include", 
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("유저정보 가져오기 실패했다");
      }
      return response.json();
    })
    .then((data) => {
      setUserInfo(data); 
      navigate("/"); 
    })
    .catch((error) => {
      console.error("Fetching user info failed:", error);
    });
  }, [setUserInfo]);

  if (!userInfo) {
    return (
      <Div>
        <Spinner />
      </Div>
    );
  }

  return <></>;
};

export default RedirectionAfterLoginPage;

const Div = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background3};
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 16px solid ${theme.colors.text4};
  border-top: 16px solid ${theme.colors.primary1};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

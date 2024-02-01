import styled from "styled-components";
import theme from "../../styles/theme";
import DarkModeBtn from "../atoms/DarkModeBtn";
import WriteBtn from "../atoms/WriteBtn";
import SearchBtn from "../atoms/SearchBtn";
import MainLogo from "../atoms/MainLogo";
import { useNavigate } from "react-router-dom";
import ProfileBtn from "../atoms/ProfileBtn";
import { homeState } from "../../state/atoms/homeState";
import { useRecoilState } from "recoil";
import { set } from "react-hook-form";
import MainLogoAfterLogin from "../atoms/MainLogoAfterLogin";
import LoginBtn from "../atoms/LoginBtn";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";


const NavBar = () => {
  const [isHome, setIsHome] = useRecoilState(homeState);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleWriteBtn = () => {
    setIsHome(false);
    navigate("/write");
  };

  const isLoggedIn = user && user.email; 

  return (
    <Container>
      {isHome ? <MainLogo /> : <MainLogoAfterLogin />}
      <Box>
        <DarkModeBtn />
        <SearchBtn />
        {isLoggedIn ? (
          <>
            <WriteBtn onClick={handleWriteBtn} />
            <ProfileBtn />
          </>
        ) : (
          <LoginBtn /> 
        )}
      </Box>
    </Container>
  );
};

export default NavBar;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 40px 20px 40px;
  width: 100%;
  background-color: ${theme.colors.background1};
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body2};
  color: ${theme.colors.text1};
`;
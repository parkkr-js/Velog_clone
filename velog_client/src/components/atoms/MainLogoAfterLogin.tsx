import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { homeState } from "../../state/atoms/homeState";
import styled from "styled-components";
import { ReactComponent as VelogLogo } from "../../assets/img/velog_logo2.svg";
import theme from "../../styles/theme";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";

const MainLogoAfterLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isHome, setIsHome] = useRecoilState(homeState);
  const user = useRecoilValue(userState);


  const handleLogoClick = () => {
    setIsHome(true);
    navigate("/");
  };

  const handleTextClick = () => {
    navigate("/posts");
  };

  return (
    <Div>
      <Logo onClick={handleLogoClick} />
      <Text onClick={handleTextClick}>{user.name}.log</Text>
    </Div>
  );
};

export default MainLogoAfterLogin;

const Logo = styled(VelogLogo)`
  cursor: pointer;
  fill: ${theme.colors.text1};
  width: 30px;
`;

const Text = styled.text`
  font-size: 30px;
  font-family: "Gamja Flower", sans-serif;
  font-weight: ${theme.fontWeights.header0};
  color: ${theme.colors.text1};
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

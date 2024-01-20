import { ReactComponent as VelogLogo } from "../../assets/img/velog_logo.svg";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tabPanelState } from "../../state/atoms/tabPanelState";
import { homeState } from "../../state/atoms/homeState";

const MainLogo = () => {
  const navigate = useNavigate();
  const [, setSelectedTab] = useRecoilState(tabPanelState);
  const [, setHomeState] = useRecoilState(homeState);

  const handleLogoClick = () => {
    navigate("/"); 
    setSelectedTab("1");
    setHomeState(true);
  };
  return (
    <>
      <Logo src={VelogLogo} onClick={handleLogoClick} alt="velog logo" />
    </>
  );
};

export default MainLogo;

const Logo = styled(VelogLogo)`
  fill: ${theme.colors.text1};
  width: 90px;
  height: fit-content;
  cursor: pointer;
`;

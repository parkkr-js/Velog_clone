import { ReactComponent as VelogLogo } from "../../img/velog_logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

const MainLogo = () => {
  return (
    <>
      <Logo src={VelogLogo} alt="velog logo" />
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

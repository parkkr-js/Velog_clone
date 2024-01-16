import styled from "styled-components";
import theme from "../../styles/theme";
import DarkModeBtn from "../atoms/DarkModeBtn";
import WriteBtn from "../atoms/WriteBtn";
import SearchBtn from "../atoms/SearchBtn";
import MainLogo from "../atoms/MainLogo";

const NavBar = () => {
  return (
    <Container>
      <MainLogo />
      <Box>
        <DarkModeBtn />
        <SearchBtn />
        <WriteBtn />
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
  justify-content: space-between; 
`;

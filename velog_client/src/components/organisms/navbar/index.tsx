import styled from "styled-components";
import theme from "../../../styles/theme";
import DarkModeBtn from "../../atoms/DarkModeBtn";
import WriteBtn from "../../atoms/WriteBtn";
import SearchBtn from "../../atoms/SearchBtn";
import MainLogo from "../../atoms/MainLogo";

const Navbar = () => {
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

export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${theme.colors.background1};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

import styled from "styled-components";
import theme from "../styles/theme";

export default function Home() {
  return (
    <Container>
      <Box>
        <H1>Home</H1>
        <Body>안녕하람? 난 지성이야</Body>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background1};
`;

const Box = styled.div`
  width: 500px;
  height: 500px;
  background-color: ${theme.colors.background2};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: ${theme.colors.primary1};
  font-size: 2rem;
`;

const Body = styled.body`
  color: ${theme.colors.text1};
  font-size: 3rem;
  font-weight: 900;
`;

import styled from "styled-components";
import theme from "../styles/theme";
import Template from "../components/templates";
import LabTabs from "../components/molecules/LabTabs";

export default function Home() {
  return (
    <>
      <Template />
      <Container>
        <LabTabs />
        <Box>
          <H1>Home</H1>
          <Body>안녕하람? 난 지성이야</Body>
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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

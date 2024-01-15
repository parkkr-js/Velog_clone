import styled from "styled-components";
import theme from "../styles/theme";
import Template from "../components/templates";
import DockBar from "../components/organisms/DockBar";
import Cards from "../components/organisms/Cards";

export default function Home() {
  return (
    <>
      <Template />
      <Container>
        <DockBar />
        <Cards />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 100px 0px 100px;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: baseline;
  box-sizing: border-box;
`;

const Box = styled.div`
  width: 500px;
  height: 500px;
  margin-top: 20px;
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

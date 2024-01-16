import styled from "styled-components";
import theme from "../styles/theme";
import Template from "../components/templates";
import DockBar from "../components/organisms/DockBar";

export default function Home() {
  return (
    <>
      <Template />
      <Container>
        <DockBar />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 40px 0px 40px;
  width: 100%;
  height: 100vh;
  align-items: center;
  background-color: yellow;
  justify-content: baseline;
  box-sizing: border-box;
`;


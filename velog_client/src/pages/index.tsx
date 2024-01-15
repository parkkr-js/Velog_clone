import styled from "styled-components";
import theme from "../styles/theme";
import Template from "../components/templates";
import DockBar from "../components/organisms/DockBar";
import Card from "../components/molecules/Card";
import imgData1 from '../assets/img/img_data1.png';

export default function Home() {
  return (
    <>
      <Template />
      <Container>
        <DockBar />
        <Card
          imageUrl={imgData1}
          title="카드 제목"
          subtitle="카드 부제목"
          description="카드 설명"
          likes={42}
          author="박지성"
          date="2024년 1월 3일"
        />
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

import styled from "styled-components";
import Template from "../../components/templates";
import MarkdownEditor from "../../components/templates/MarkDownTemplate";

export default function Post() {
  return (
    <>
      <Template />
      <MarkdownEditor />
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
  justify-content: baseline;
  box-sizing: border-box;
`;

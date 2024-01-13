import styled from "styled-components";
import theme from "../../styles/theme";

const WriteBtn = () => {
  return (
    <Container>
      <Button>새 글 작성</Button>
    </Container>
  );
};

export default WriteBtn;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: transparent;
  color: ${theme.colors.text1};
  border-radius: 30px;
  border: 2px solid ${theme.colors.text1};
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  &:hover {
    background-color: ${theme.colors.primary2};
  }
`;
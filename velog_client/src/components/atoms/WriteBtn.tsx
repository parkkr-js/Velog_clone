import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

interface WriteBtnProps {
  onClick: () => void; 
}

const WriteBtn: React.FC<WriteBtnProps> = ({ onClick }) => {
  return <Button onClick={onClick}>새 글 작성</Button>;
};
export default WriteBtn;

const Button = styled.button`
  width: fit-content;
  height: auto;
  padding: 6px 15px;
  background-color: ${theme.colors.background2};
  color: ${theme.colors.text1};
  border-radius: 30px;
  border: 2px solid ${theme.colors.text1};
  cursor: pointer;
  font-size: ${theme.fontSizes.button1};
  font-weight: ${theme.fontWeights.button1};
  &:hover {
    background-color: ${theme.colors.text1};
    color: ${theme.colors.background1};
  }
`;

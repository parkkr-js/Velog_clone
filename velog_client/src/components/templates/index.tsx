import styled from "styled-components";
import theme from "../../styles/theme";

const Template = () => {
  return (
    <>
      <TemplateBackground />
    </>
  );
};

export default Template;

const TemplateBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background1};
  background-attachment: fixed;
  z-index: -1;
`;

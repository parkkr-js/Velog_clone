import { Container } from "@mui/material";
import LabTabs from "../molecules/LabTabs";
import SelectBox from "../molecules/SelectBox";
import styled from "styled-components";
import Cards from "../molecules/Cards";

const DockBar = () => {
  return (
    <StyledContainer>
      <Div>
        <LabTabs />
        <SelectBox />
      </Div>
      <Cards />
    </StyledContainer>
  );
};

export default DockBar;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 0;
  margin: 0;
  background-color: red;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  background-color: blue;
  width: 100%;
  height: fit-content;
  padding: 0 10px;
`;

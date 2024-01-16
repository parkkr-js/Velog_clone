import LabTabs from "../molecules/LabTabs";
import SelectBox from "../molecules/SelectBox";
import Cards from "../molecules/Cards";
import styled from "styled-components";

const DockBar = () => {
  return (
    <Container>
      <Div>
        <LabTabs />
        <SelectBox />
      </Div>
      <Cards />
    </Container>
  );
};

export default DockBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  height: fit-content;
`;

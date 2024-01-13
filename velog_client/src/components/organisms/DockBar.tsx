import LabTabs from "../molecules/LabTabs";
import SelectBox from "../molecules/SelectBox";
import styled from "styled-components";


const DockBar = () => {
    return (
       <Div>
        <LabTabs />
        <SelectBox />
       </Div>
      );
}

export default DockBar;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  height: fit-content;
  padding: 0 10px;
`;
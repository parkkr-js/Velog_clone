import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import theme from "../../styles/theme";
import styled from "styled-components";

const LabTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <StyledBox>
      <TabContext value={value}>
        <StyledBox>
          <StyledTabList onChange={handleChange}>
            <StyledTab label="Item One" value="1" />
            <StyledTab label="Item Two" value="2" />
            <StyledTab label="Item Three" value="3" />
          </StyledTabList>
        </StyledBox>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </StyledBox>
  );
};

export default LabTabs;

const StyledBox = styled(Box)`
  width: 400px;
  background-color: ${theme.colors.background1};
  color: ${theme.colors.text1};
`;

const StyledTabList = styled(TabList)`
  border-bottom: 1px solid;
  border-color: ${theme.colors.background1};
  .MuiTabs-indicator {
    background-color: ${theme.colors.text1};
  }
`;

const StyledTab = styled(Tab)`
  font-size: ${theme.fontSizes.button1};
  font-weight: ${theme.fontWeights.button1};
  color: ${theme.colors.text2};

  &.Mui-selected {
    color: ${theme.colors.text1};
  }
`;

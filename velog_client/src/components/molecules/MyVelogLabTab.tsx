import * as React from "react";
import { useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import theme from "../../styles/theme";
import styled from "styled-components";

const MyVelogLabTabs: React.FC = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <StyledBox>
      <TabContext value={value}>
        <StyledBox>
          <StyledTabList onChange={handleChange}>
            <StyledTab label="글" value="1" />
            <StyledTab label="시리즈" value="2" />
            <StyledTab label="소개" value="3" />
          </StyledTabList>
        </StyledBox>
        <TabPanel value="1" />
        <TabPanel value="2" />
        <TabPanel value="3" />
      </TabContext>
    </StyledBox>
  );
};

export default MyVelogLabTabs;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 740px;
  padding-top: 30px;
  padding-bottom: 10px;
`;

const StyledTabList = styled(TabList)`
  border-bottom: 1px solid ${theme.colors.background1};
  .MuiTabs-indicator {
    background-color: ${theme.colors.primary2};
  }
`;

const StyledTab = styled(Tab)`
  font-size: ${theme.fontSizes.tabList};
  font-weight: ${theme.fontWeights.body1};
  color: ${theme.colors.text1};
    width: 130px;
  &.Mui-selected {
    width: 130px;
    color: ${theme.colors.primary2};
  }
`;

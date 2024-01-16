import * as React from "react";
import { useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import theme from "../../styles/theme";
import styled from "styled-components";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Cards from "../organisms/Cards";
import { useRecoilState } from 'recoil';
import { tabPanelState } from '../../state/atoms/tabPanelState';

const LabTabs = () => {
  const [value, setValue] = useState("1");
  const [selectedTab, setSelectedTab] = useRecoilState(tabPanelState);


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedTab(newValue); 
    console.log(selectedTab);
  };

  interface TabLabelProps {
    icon: ReactNode;
    label: string;
  }
  
  const TabLabel: React.FC<TabLabelProps> = ({ icon, label }) => (
    <TabLabelContainer>
      {icon}
      <TabLabelText>{label}</TabLabelText>
    </TabLabelContainer>
  );

  return (
    <StyledBox>
      <TabContext value={value}>
        <StyledBox>
          <StyledTabList onChange={handleChange}>
            <StyledTab
              icon={<TabLabel icon={<TrendingUpIcon />} label="트렌딩" />}
              value="1"
            />
            <StyledTab
              icon={<TabLabel icon={<AccessTimeIcon />} label="최신" />}
              value="2"
            />
            <StyledTab
              icon={<TabLabel icon={<RssFeedIcon />} label="피드" />}
              value="3"
            />
          </StyledTabList>
        </StyledBox>
        <TabPanel value="1"><Cards/></TabPanel>
        <TabPanel value="2"><Cards/></TabPanel>
        <TabPanel value="3">피드</TabPanel>
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

const TabLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TabLabelText = styled.span`
  margin-left: 8px;
`;

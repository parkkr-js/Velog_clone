import React from "react";
import { MyVelogCardList } from "../molecules/MyVelogCardList";
import styled from "styled-components";
import MyVelogProfileSection from "../atoms/MyVelogProfileSection";
import MyVelogTags from "../atoms/MyVelogTags";
import MyVelogSearchBar from "../atoms/MyVelogSearchBar";
import MyVelogLabTabs from "../molecules/MyVelogLabTab";

export const MyVelogCardsTemplate: React.FC = () => {
  return (
    <Div>
      <MyVelogProfileSection />
      <MyVelogLabTabs />
      <MyVelogSearchBar />
      <RowDiv>
        <MyVelogTags />
        <MyVelogCardList />
        <Box />
      </RowDiv>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  align-items: center;
  justify-content: center;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  background-color: transparent;
`;

const Box = styled.div`
  width: 180px;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: transparent;
`;

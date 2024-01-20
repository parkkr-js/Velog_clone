import React, { useState } from "react";
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import theme from "../../styles/theme";

const MyVelogSearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Div>
      <SearchContainer isFocused={isFocused}>
        <StyledSearchIcon isFocused={isFocused} />
        <StyledInputBase
          placeholder="검색어를 입력하세요"
          inputProps={{ "aria-label": "search" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </SearchContainer>
    </Div>
  );
};

export default MyVelogSearchBar;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  width: 740px;
  align-items: center;
  justify-content: end;
`;
const SearchContainer = styled(Box)<{ isFocused: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  color: ${theme.colors.text4};
  border: 1px solid ${theme.colors.text2};
  border-color: ${(props) =>
    props.isFocused ? theme.colors.text1 : theme.colors.text2};
  margin-bottom: 30px;
  border-radius: 4px;
  padding: 0px 8px;
  background-color: transparent;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;

  & .MuiInputBase-input {
    padding: 8px 8px 8px 0;
    transition: all 0.3s ease;
  }
`;

const StyledSearchIcon = styled(SearchIcon)<{ isFocused: boolean }>`
  color: ${(props) =>
    props.isFocused ? theme.colors.background3 : theme.colors.text2};

  margin-right: 8px;
  transition: color 0.3s ease;
`;

import { useState } from "react";
import Box from "@mui/material/Box";
import { withTheme } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import theme from "../../styles/theme";
import styled from "styled-components";

const SelectBox = () => {
  const [term, setTerm] = useState("오늘");

  const handleChange = (event: SelectChangeEvent<any>) => {
    const value = event.target.value;
    setTerm(value as string);
  };

  return (
    <StyledBox>
      <FormControl>
        <StyledSelect
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: theme.colors.background2,
              },
            },
          }}
          value={term}
          label="기간"
          onChange={handleChange}
        >
          <StyledMenuItem value={"오늘"}>오늘</StyledMenuItem>
          <StyledMenuItem value={"이번 주"}>이번 주</StyledMenuItem>
          <StyledMenuItem value={"이번 달"}>이번 달</StyledMenuItem>
          <StyledMenuItem value={"올해"}>올해</StyledMenuItem>
        </StyledSelect>
      </FormControl>
    </StyledBox>
  );
};
export default SelectBox;

const StyledBox = styled(Box)`
  .MuiFormControl-root {
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.background2};
    width: 140px;
    height: 50px;
    border-radius: 5px;
    .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
  }
`;

const StyledSelect = styled(Select)`
  .MuiSelect-select {
    font-size: ${theme.fontSizes.button1};
    font-weight: ${theme.fontWeights.button1};
    color: ${theme.colors.text1};
  }
  .MuiSelect-icon {
    font-size: 35px;
    color: ${theme.colors.text1};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  width: 220px;
  padding-bottom: 15px;
  padding-top: 15px;
  font-size: ${theme.fontSizes.button1};
  font-weight: ${theme.fontWeights.button1};
  color: ${theme.colors.text1};
  border-bottom: 1px solid ${theme.colors.secondary}; 
  &:first-child {
    padding-top: 7px;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 7px;
  }
  &.Mui-selected {
    color: ${theme.colors.primary1};
    background-color: transparent;
  }
`;



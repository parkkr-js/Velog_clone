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
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
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
    width: 120px;
    height: 42px;
    border-radius: 5px;
    .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
  }
`;

const StyledSelect = styled(Select)`
  .MuiSelect-select {
    font-size: ${theme.fontSizes.body1};
    font-weight: ${theme.fontWeights.button1};
    color: ${theme.colors.text1};
  }
  .MuiSelect-icon {
    color: ${theme.colors.text1};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  width: 180px;
  padding-bottom: 12px;
  padding-top: 12px;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.button1};
  color: ${theme.colors.text1};
  border-bottom: 1px solid ${theme.colors.background3};

  &:first-child {
    padding-top: 5px;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 5px;
  }
  &.Mui-selected {
    color: ${theme.colors.primary1};
    background-color: transparent;
  }
`;

import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const DarkModeBtn = () => {
  return (
    <IconButton>
      <CustomDarkModeIcon />
    </IconButton>
  );
};

export default DarkModeBtn;

const CustomDarkModeIcon = styled(DarkModeIcon)`
  color: white;  
  font-size: 30px;
`;
import React, { useState } from "react";
import styled from "styled-components";
import { Box, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const ProfileBtn: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <StyledIconButton onClick={handleClick}>
        <StyledAvatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <StyledArrowDropDownIcon />
      </StyledIconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/posts");
            handleClose();
          }}
        >
          내 벨로그
        </MenuItem>
        <MenuItem onClick={handleClose}>임시 글</MenuItem>
        <MenuItem onClick={handleClose}>읽기 목록</MenuItem>
        <MenuItem onClick={handleClose}>설정</MenuItem>
        <MenuItem onClick={handleClose}>로그아웃</MenuItem>
      </StyledMenu>
    </Box>
  );
};

export default ProfileBtn;

const StyledIconButton = styled(IconButton)`
  margin-left: 5px;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 5px;
  width: 45px;
  height: 45px;
`;

const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)`
  color: ${theme.colors.secondary};
  &:hover {
    color: ${theme.colors.text1};
  }
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    width: 200px;
    background-color: ${theme.colors.background2};
    color: ${theme.colors.text1};
  }
  .MuiMenuItem-root {
    padding: 13px 20px;
    font-size: ${theme.fontSizes.button1};
    font-weight: ${theme.fontWeights.button1};
    &:hover {
      color: ${theme.colors.primary1};
    }
    &:first-child {
      padding-top: 5px;
    }
    &:last-child {
      padding-bottom: 5px;
    }
  }
`;

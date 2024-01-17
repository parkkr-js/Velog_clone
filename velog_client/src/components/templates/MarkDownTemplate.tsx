import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import theme from "../../styles/theme";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IFormInput {
  title: string;
}

const MarkdownEditor: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              sx={{
                width: "50%",
                backgroundColor: theme.colors.background1,
                "& .MuiInputBase-input": {
                  color: theme.colors.text1,
                  fontWeight: "900",
                  fontSize: "40px",
                  "::placeholder": {
                    color: "white",
                    opacity: 0.6,
                  },
                },
              }}
              InputProps={{
                disableUnderline: true,
              }}
              {...field}
              hiddenLabel
              id="outlined-multiline-flexible"
              variant="filled"
              placeholder="제목을 입력하세요"
              multiline
              minRows={1}
            />
          )}
        />
      </form>

      <Editor
        height="100vh"
        placeholder="당신의 이야기를 적어보세요..."
        previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
        initialEditType="markdown"
        hideModeSwitch={true}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          ["scrollSync"],
        ]}
        theme="dark"
        usageStatistics={false}
      />
      <NavBarContainer>
        <StyledOutBtn variant="contained" startIcon={<ArrowBackIcon />}>
          나가기
        </StyledOutBtn>
        <Box>
          <StyledSaveBtn variant="contained">임시저장</StyledSaveBtn>
          <StyledPostBtn variant="contained">출간하기</StyledPostBtn>
        </Box>
      </NavBarContainer>
    </Container>
  );
};

export default MarkdownEditor;

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 25px;
`;

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.background3};
  padding: 10px 20px;
  width: 50%;
`;

const StyledOutBtn = styled(Button)`
  && {
    box-shadow: none;
    color: ${theme.colors.text1};
    font-weight: ${theme.fontWeights.body2};
    font-size: ${theme.fontSizes.button1};
    background-color: ${theme.colors.background3};
    border-radius: 5px;
    padding: 8px 16px;
    text-transform: none;
    &:hover {
      background-color: #434343;
    }
  }
`;

const StyledPostBtn = styled(Button)`
  && {
    box-shadow: none;
    color: ${theme.colors.background3};
    font-weight: ${theme.fontWeights.body1};
    font-size: ${theme.fontSizes.button1};
    background-color: ${theme.colors.primary1};
    border-radius: 5px;
    padding: 8px 16px;
    text-transform: none;
    &:hover {
      background-color: ${theme.colors.primary2};
    }
  }
`;

const StyledSaveBtn = styled(Button)`
  && {
    box-shadow: none;
    color: ${theme.colors.primary1};
    font-weight: ${theme.fontWeights.body1};
    font-size: ${theme.fontSizes.button1};
    background-color: ${theme.colors.background3};
    border-radius: 5px;
    padding: 8px 16px;
    text-transform: none;
    &:hover {
      background-color: #434343;
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

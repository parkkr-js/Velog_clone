import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import theme from "../../styles/theme";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import TagsEditor from "../atoms/TagsEditor";

interface IFormInput {
  title: string;
}

const MarkdownEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const { control, handleSubmit } = useForm<IFormInput>();

  const goBack = () => {
    window.history.back();
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Editor
            height="100%"
            initialValue="# 제목을 입력하세요"
            // placeholder="당신의 이야기를 적어보세요..."
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
            {...field}
          />
        )}
      />
      <TagsEditor />
      <NavBarContainer>
        <StyledOutBtn
          onClick={goBack}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
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
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: ${theme.colors.background2};
  flex-direction: column;
  box-sizing: border-box;
  padding: 30px 25px;
`;

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: ${theme.colors.background3};
  padding: 8px 18px;
  height: fit-content;
  width: 100%;
  border-radius: 0 0px 8px 8px;
`;

const StyledOutBtn = styled(Button)`
  && {
    box-shadow: none;
    color: ${theme.colors.text1};
    font-weight: ${theme.fontWeights.body2};
    font-size: ${theme.fontSizes.button1};
    background-color: ${theme.colors.background3};
    border-radius: 5px;
    padding: 5px 13px;
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
    padding: 5px 13px;
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
    padding: 5px 13px;
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
  border: 1px solid ${theme.colors.background3};
  box-sizing: border-box;
  border-radius: 50px;
`;

/**
 * ![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# Awesome Editor!

It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## Create Instance

You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).

```js
const editor = new Editor(options);
```

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | `HTMLElement` | container element |

## Features

* CommonMark + GFM Specifications
   * Live Preview
   * Scroll Sync
   * Auto Indent
   * Syntax Highlight
        1. Markdown
        2. Preview

## Support Wrappers

> * Wrappers
>    1. [x] React
>    2. [x] Vue
>    3. [ ] Ember
 */

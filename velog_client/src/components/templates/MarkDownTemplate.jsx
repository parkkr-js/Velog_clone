import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import theme from "../../styles/theme";
import styled from "styled-components";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TagsEditor from "../atoms/TagsEditor";
import { uploadToS3, deleteFilesInS3 } from "../../api/awsS3";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../state/atoms/userState";
import { articleState } from "../../state/atoms/articleState";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";

const MarkdownEditor = () => {
  const API = process.env.REACT_APP_API_URL;
  const [uploadedImageKeys, setUploadedImageKeys] = useState([]);
  const currentUser = useRecoilValue(userState);
  const articleTags = useRecoilValue(articleState).tags;
  const setArticle = useSetRecoilState(articleState);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      markdownContent: "",
    },
  });
  const editorRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data.markdownContent);
  };

  const addImageBlobHook = async (blob, callback) => {
    try {
      const uploadResult = await uploadToS3(blob, true);
      const fileName = uploadResult.fileName;
      setUploadedImageKeys((prev) => [...prev, uploadResult.Key]);
      callback(fileName);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handlePublish = async () => {
    // '출간하기' 버튼을 클릭했을 때의 로직
    const articleContent = editorRef.current?.getInstance().getMarkdown();

    const articleData = {
      title: "글 제목",
      content: articleContent,
      tagList: articleTags,
      memberId: currentUser.memberId,
    };

    axios
      .post(`${API}/api/post/create`, articleData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Article published successfully");
        setArticle(articleData);
        setUploadedImageKeys([]);
      })
      .catch((error) => {
        console.error("Error publishing article: ", error);
      });
    console.log("articleData: ", articleData);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    return () => {
      if (uploadedImageKeys.length > 0) {
        deleteFilesInS3(uploadedImageKeys)
          .then(() => console.log("이미지 삭제 완료"))
          .catch(console.error);
      }
    };
  }, [uploadedImageKeys]);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="markdownContent"
        control={control}
        render={({ field }) => (
          <Editor
            height="100%"
            placeholder="내용을 입력하세요"
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
            hooks={{
              addImageBlobHook: addImageBlobHook,
            }}
            {...field}
            ref={editorRef}
            initialValue={watch("markdownContent")}
            onChange={() =>
              field.onChange(editorRef.current.getInstance().getMarkdown())
            }
          />
        )}
      />

      <TagsEditor />
      <NavBarContainer>
        <StyledOutBtn
          onClick={handleGoBack}
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          나가기
        </StyledOutBtn>
        <Box>
          <StyledSaveBtn variant="contained">임시저장</StyledSaveBtn>
          <StyledPostBtn onClick={handlePublish} variant="contained">
            출간하기
          </StyledPostBtn>
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

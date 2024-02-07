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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MarkdownEditor = () => {
  const API = process.env.REACT_APP_API_URL;
  const [uploadedImageKeys, setUploadedImageKeys] = useState([]);
  const currentUser = useRecoilValue(userState);
  const publishedArticleState = useRecoilValue(articleState);
  const articleTags = useRecoilValue(articleState).tags;
  const setArticle = useSetRecoilState(articleState);

  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      markdownContent: "",
    },
  });
  const editorRef = useRef(null);

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data.markdownContent);
  };

  const addImageBlobHook = async (blob, callback) => {
    try {
      const uploadResult = await uploadToS3(blob, true);
      const imageUrl = uploadResult.imageUrl;
      setUploadedImageKeys((prev) => [
        ...prev,
        { url: imageUrl, key: uploadResult.key },
      ]);
      console.log("key: ", uploadResult.key);
      console.log("imageUrl: ", imageUrl);
      callback(imageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handlePublish = async () => {
    const articleContent = editorRef.current?.getInstance().getMarkdown();

    const firstLineEndIndex = articleContent.indexOf("\n");
    const title =
      firstLineEndIndex !== -1
        ? articleContent.substring(0, firstLineEndIndex)
        : articleContent;
    // 제목으로 사용된 첫 줄을 콘텐츠에서 제거
    const contentWithoutTitle = firstLineEndIndex !== -1 ? articleContent.substring(firstLineEndIndex + 1) : "";

    const articleData = {
      title: title.trim(),
      content: contentWithoutTitle,
      thumbnail: uploadedImageKeys[0]?.url,
      tagList: articleTags,
      memberId: currentUser.memberId,
    };

    try {
      const response = await axios.post(`${API}/api/post/create`, articleData, {
        withCredentials: true,
      });
      const publishedArticle = response.data;

      const updatedArticle = {
        articleId: publishedArticle.postId,
        title: publishedArticle.title,
        content: publishedArticle.content,
        memberId: publishedArticle.member.memberId,
        nickname: publishedArticle.member.nickname,
        profileImage: publishedArticle.member.profileImage,
        thumbnail: publishedArticle.thumbnail,
        date: publishedArticle.modifiedAt,
        commentCount: publishedArticle.commentCount,
        likeCount: publishedArticle.likeCount,
        tags: publishedArticle.tagList,
      };

      setArticle(updatedArticle);
      console.log("Article published successfully");
      setUploadedImageKeys([]);
      navigate(`/postdetail/${publishedArticle.postId}`);
    } catch (error) {
      console.error("Error publishing article: ", error);
    }
  };

  const handleGoBack = () => {
    if (window.confirm("작성을 취소하시겠습니까? 저장되지 않습니다.")) {
    if (uploadedImageKeys.length > 0) {
      const keys = uploadedImageKeys.map((item) => item.key);
      deleteFilesInS3(keys)
        .then(() => console.log("이미지 삭제 완료"))
        .catch(console.error);
    }

    window.history.back();
    }
  };

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

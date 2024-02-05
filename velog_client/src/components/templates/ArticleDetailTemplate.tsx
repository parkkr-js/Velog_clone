import styled from "styled-components";
import { Card } from "../../state/atoms/cardState";
import theme from "../../styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import MyVelogProfileSection from "../atoms/MyVelogProfileSection";
import { articleState } from "../../state/atoms/articleState";
import { Article } from "../../state/atoms/articleState";
import { Typography } from "@mui/material";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";
import Comment from "../molecules/Comment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// interface ArticleDetailTemplateProps {
//   article: Article | null;
// }

const cleanMarkdownCharacters = (title: string) => {
  return title.replace(/^[\s#*->]+/, "");
};

const ArticleDetailTemplate: React.FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const API = process.env.REACT_APP_API_URL;
  const { articleId } = useParams();
  const setArticle = useSetRecoilState(articleState);
  const article = useRecoilValue(articleState);

  const handleDelete = async () => {
    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/post/delete/${article.articleId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Delete successful");
        navigate("/posts");
      } catch (error) {
        console.error("Error deleting article: ", error);
        alert("글을 삭제하는 동안 오류가 발생했습니다.");
      }
    }
  };
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${API}/api/post/articles/${articleId}`,
          {
            withCredentials: true,
          }
        );
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
        console.log("Fetched article: ", article);
      } catch (error) {
        console.error("Error fetching article: ", error);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split("T");
    const parts = datePart.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];

      return `${year}년 ${month}월 ${day}일`;
    }
    return dateString;
  };

  const handleEdit = () => {
    console.log("Edit");
    navigate(`/write/${article.articleId}`);
  };

  return (
    <Div>
      <Title>
        {article.title ? cleanMarkdownCharacters(article.title) : "제목 없음"}
      </Title>
      <RowDiv>
        <RowDiv2>
          <UserName>{article.nickname}</UserName>
          <Date>
            {article.date ? formatDate(article.date) : "날짜 정보 없음"}
          </Date>
        </RowDiv2>
        <BtnDiv>
          {user && article.memberId === user.memberId && (
            <>
              <Btn onClick={handleEdit}>수정</Btn>
              <Btn onClick={handleDelete}>삭제</Btn>
            </>
          )}
        </BtnDiv>
      </RowDiv>
      <TagContainer>
        {article.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>

      <Image
        src={
          article.thumbnail
            ? article.thumbnail
            : "https://64.media.tumblr.com/9a0b871fb2167a4cb290378340ca0fcf/c6d1989e69679318-a2/s400x600/d0b9e100cff357afd107ce9c2e62c28fa7e8b055.gif"
        }
        alt={article.title}
      />

      <Content>
        <Viewer
          width="100%"
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          initialValue={article.content}
          theme="dark"
        />
      </Content>
      <MyVelogProfileSection />
      <Br />
      <Comment
        comment={{
          id: 1,
          userProfile: "프로필 이미지 URL",
          nickname: "유저 닉네임",
          content: "댓글 내용",
          date: "2024-02-01T12:00:00Z",
          replies: [
            {
              id: 2,
              userProfile: "대댓글 유저 프로필 이미지 URL",
              nickname: "대댓글 유저 닉네임",
              content: "대댓글 내용",
              date: "2024-02-05T15:00:00Z",
            },
            // 추가 대댓글...
          ],
        }}
      />
    </Div>
  );
};

export default ArticleDetailTemplate;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  padding-top: 60px;
  width: 760px;
  height: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const RowDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
`;

const RowDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  gap: 15px;
  align-items: center;
  justify-content: flex-start;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body1};
  color: ${theme.colors.text1};
`;

const Title = styled(Typography)`
  font-size: ${theme.fontSizes.header1};
  font-weight: ${theme.fontWeights.header0};
  color: ${theme.colors.text1};
  width: 100%;
  padding-bottom: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body2};
  color: ${theme.colors.text4};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 750px;
  min-width: 750px;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body2};
  color: ${theme.colors.text1};
  padding-top: 32px;
  padding-bottom: 150px;
`;

const Image = styled.img`
  width: 50%;
  height: 50%;
`;

const Btn = styled.button`
  width: fit-content;
  height: fit-content;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body2};
  color: ${theme.colors.text2};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  padding-bottom: 32px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 5px 12px;
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body1};
  color: ${theme.colors.primary2};
  background-color: ${theme.colors.background3};
  border: none;
  border-radius: 15px;
`;

const Br = styled.br`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.secondary};
`;

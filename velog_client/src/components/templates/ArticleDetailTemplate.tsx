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

interface ArticleDetailTemplateProps {
  card: Card | null;
}

const markdownText = `
* ![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)

# 마크다운 적용한 컨텐츠 내용

목데이터 ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.

## 부제목
한글확인 테스트 한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트한글확인 테스트 


\`\`\`js
const editor = new Editor(options);
\`\`\`

> See the table below for default options
> > More API information can be found in the document

| name | type | description |
| --- | --- | --- |
| el | \`HTMLElement\` | container element |

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
>    3. [ ] Ember.
`;

const ArticleDetailTemplate: React.FC<ArticleDetailTemplateProps> = ({
  card,
}) => {
  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <Div>
      <Title>{card.title}</Title>
      <RowDiv>
        <RowDiv2>
          <UserName>{card.author}</UserName>
          <Date>{formatDate(card.date)}</Date>
        </RowDiv2>
        <BtnDiv>
          <Btn>수정</Btn>
          <Btn>삭제</Btn>
        </BtnDiv>
      </RowDiv>
      <TagContainer>
        {card.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <Image src={card.imageUrl} alt={card.title} />
      <Content>
        <Viewer
          width="100%"
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          initialValue={markdownText}
          theme="dark"
        />
      </Content>
    </Div>
  );
};

export default ArticleDetailTemplate;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month.toString().padStart(2, "0")}월 ${day
    .toString()
    .padStart(2, "0")}일`;
}

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

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  font-size: ${theme.fontSizes.header1};
  font-weight: ${theme.fontWeights.header0};
  color: ${theme.colors.text1};
  width: 100%;
  padding-bottom: 32px;
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
`;

const Image = styled.img`
  width: auto;
  height: auto;
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

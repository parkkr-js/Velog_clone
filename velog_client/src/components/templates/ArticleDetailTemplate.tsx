import styled from "styled-components";
import { Card } from "../../state/atoms/cardState";
import theme from "../../styles/theme";

interface ArticleDetailTemplateProps {
  card: Card | null;
}

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
        <UserName>{card.author}</UserName>
        <Date>{formatDate(card.date)}</Date>
      </RowDiv>
      <p>{card.content}</p>
      <img src={card.imageUrl} alt={card.title} />
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
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: start;
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
`;

const Date = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSizes.body1};
    font-weight: ${theme.fontWeights.body2};
    color: ${theme.colors.text2};
    `;

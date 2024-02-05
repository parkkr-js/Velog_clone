import React from "react";
import { Card as CardType } from "../../state/atoms/cardState";
import { Card as MuiCard, CardActions, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const CardTemplate: React.FC<{ card: CardType }> = ({ card }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/postdetail/${card.id}`);
  };
  const cleanMarkdownCharacters = (title: string) => {
    return title.replace(/^[\s#*->]+/, "");
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardImage
        src={
          card.imageUrl
            ? card.imageUrl
            : "https://64.media.tumblr.com/9a0b871fb2167a4cb290378340ca0fcf/c6d1989e69679318-a2/s400x600/d0b9e100cff357afd107ce9c2e62c28fa7e8b055.gif"
        }
        alt={card.title}
      />

      <ContentDiv>
        <Title>
          {" "}
          {card.title ? cleanMarkdownCharacters(card.title) : "제목 없음"}
        </Title>
        <Content>{card.content}</Content>
      </ContentDiv>
      <DateAndComment>
        <Date>{card.date}</Date>
        <Dot>·</Dot>
        <CommentCount>{card.commentCount}개의 댓글</CommentCount>
      </DateAndComment>
      <Line />
      <AuthorAndLikes>
        <Div1>
          <ProfileImage src={card.profileImageUrl} alt={card.author} />
          <By>by</By>
          <Author>{card.author}</Author>
        </Div1>
        <Div2>
          <Like />
          <LikeCounter>{card.likeCount}</LikeCounter>
        </Div2>
      </AuthorAndLikes>
    </StyledCard>
  );
};

export default CardTemplate;

const StyledCard = styled(MuiCard)`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 375px;
  justify-content: space-between;
  background-color: ${theme.colors.background2};
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 20px ${theme.colors.secondary};
    transform: translateY(-10px);
  }
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const Title = styled(Typography)`
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${theme.fontWeights.body1};
`;

const Content = styled(Typography)`
  font-size: 14px;
  overflow: hidden;
  display: -webkit-box;
  color: ${theme.colors.text3};
  font-weight: ${theme.fontWeights.body2};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  text-overflow: ellipsis;
`;

const Date = styled(Typography)`
  font-size: ${theme.fontSizes.body3};
  color: ${theme.colors.text2};
`;

const CommentCount = styled(Typography)`
  font-size: ${theme.fontSizes.body3};
  color: ${theme.colors.text2};
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Dot = styled.span`
  padding-left: 2.5px;
  padding-right: 2.5px;
  color: ${theme.colors.text2};
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid #2a2a2a;
`;

const DateAndComment = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 12px;
`;

const AuthorAndLikes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 0 12px 12px 12px;
`;

const Author = styled(Typography)`
  font-size: ${theme.fontSizes.body3};
  color: ${theme.colors.text1};
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 25%;
  padding: 12px;
  gap: 8px;
  color: ${theme.colors.text1};
`;

const StyledCardActions = styled(CardActions)`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
`;

const By = styled(Typography)`
  font-size: ${theme.fontSizes.body2};
  color: ${theme.colors.text2};
`;
const Like = styled(FavoriteIcon)`
  color: ${theme.colors.text1};
  font-size: ${theme.fontSizes.body1};
`;

const LikeCounter = styled(Typography)`
  font-size: ${theme.fontSizes.body2};
  color: ${theme.colors.text1};
  font-weight: ${theme.fontWeights.body2};
`;
const CardImage = styled.img`
  width: 100%;
  height: 45%;
`;

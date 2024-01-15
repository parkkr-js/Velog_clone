import React from "react";
import { Card as CardType } from "../../state/atoms/CardState";
import {
  Card as MuiCard,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import theme from "../../styles/theme";

const CardTemplate: React.FC<{ card: CardType }> = ({ card }) => {
  return (
    <StyledCard>
      <CardImage src={card.imageUrl} />
      <StyledCardContent>
        <Title>{card.title}</Title>
        <Content>{card.content}</Content>
      </StyledCardContent>
      <StyledCardActions disableSpacing>
        <Date>{formatDate(card.date)}</Date>
        <CommentCount>{card.commentCount}개의 댓글</CommentCount>
       
        <div>
          <LikeButton>
            <ProfileImage src={card.profileImageUrl} />
          <AuthorName>{card.author}</AuthorName>
            <LikeCounter>{card.likeCount}</LikeCounter>
            <FavoriteIcon />
          </LikeButton>
        </div>
      </StyledCardActions>
    </StyledCard>
  );
};

export default CardTemplate;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month.toString().padStart(2, "0")}월 ${day
    .toString()
    .padStart(2, "0")}일·`;
}

const StyledCard = styled(MuiCard)`
  background-color: ${theme.colors.background2};
  margin: 23px;
  width: 350px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CardAuthor = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5em;
`;

const StyledCardContent = styled(CardContent)`
  padding: 14px;
  color: ${theme.colors.text1};
  /* background-color: red; */
`;

const StyledCardActions = styled(CardActions)`
  padding: 0 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorName = styled(Typography)`
  font-size: 0.875rem;
`;

const LikeButton = styled(IconButton)`
  color: #ffffff;
`;

const LikeCounter = styled(Typography)`
  font-size: ${theme.fontSizes.body3};
  color: ${theme.colors.text2};
`;
const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

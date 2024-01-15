import React from 'react';
import styled from 'styled-components';
import { CardContent, Typography, CardMedia, CardActions, IconButton } from '@mui/material';
import { Card as CardComponent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import theme from '../../styles/theme';

interface CardComponentProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  author: string;
  date: string;
}



const Card: React.FC<CardComponentProps> = ({
  imageUrl,
  title,
  subtitle,
  description,
  likes,
  author,
  date
}) => {
  return (
    <StyledCard>
      <StyledCardMedia
        image={imageUrl}
        title="Image title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {subtitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date} by {author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <StyledIconButton aria-label="add to favorites">
          <FavoriteIcon />
          {likes}
        </StyledIconButton>
      </CardActions>
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled(CardComponent)`
  width: 350px;
  height: 450px;
  background: ${theme.colors.background2};
  color: ${theme.colors.text1};
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
`;

const StyledIconButton = styled(IconButton)`
  font-size: 20px;
  color: white;
`;
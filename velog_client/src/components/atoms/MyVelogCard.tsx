import React from 'react';
import { Card as MuiCard, CardContent, Typography, CardActions, Button, Avatar } from '@mui/material';
import styled from 'styled-components';
import { Card as CardType } from "../../state/atoms/cardState";

type CardProps = {
  card: CardType;
};

const MyVelogCard: React.FC<CardProps> = ({ card }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </StyledCard>
  );
};

export default MyVelogCard;

const StyledCard = styled(MuiCard)`
  // Style your card
`;

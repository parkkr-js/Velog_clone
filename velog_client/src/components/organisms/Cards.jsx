import React from 'react';
import CardTemplate from '../templates/CardTemplate';
import { CardData } from "../../assets/data/CardData";

const Cards = () => {
  return (
    <div>
      {CardData.map(card => (
        <CardTemplate key={card.id} card={card} />
      ))}
    </div>
  );
};

export default Cards;

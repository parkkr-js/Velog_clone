import React from 'react';
import { CardData } from '../../assets/data/CardData';
import MyVelogCard from '../atoms/MyVelogCard';

export const MyVelogCardList: React.FC = () => {
  return (
    <div>
      {CardData.map(card => (
        <MyVelogCard key={card.id} card={card} />
      ))}
    </div>
  );
};

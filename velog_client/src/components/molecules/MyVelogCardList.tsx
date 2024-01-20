import React from "react";
import { CardData } from "../../assets/data/CardData";
import MyVelogCard from "../atoms/MyVelogCard";
import styled from "styled-components";

export const MyVelogCardList: React.FC = () => {
  return (
    <Div>
      {CardData.map((card) => (
        <MyVelogCard key={card.id} card={card} />
      ))}
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  justify-content: center;
`;

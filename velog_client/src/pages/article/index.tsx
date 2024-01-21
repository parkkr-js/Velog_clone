import { useParams } from "react-router-dom";
import styled from "styled-components";
import Template from "../../components/templates";
import { useEffect, useState } from "react";
import { CardData } from "../../assets/data/CardData";
import { Card } from "../../state/atoms/cardState";
import ArticleDetailTemplate from "../../components/templates/ArticleDetailTemplate";

const ArticleDetailPage: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    const cardIdNum = parseInt(cardId || "0");
    const foundCard = CardData.find((c) => c.id === cardIdNum);
    setCard(foundCard || null);
  }, [cardId]);

  return (
    <>
      <Template />
      <ArticleDetailTemplate card={card} />
    </>
  );
};

export default ArticleDetailPage;

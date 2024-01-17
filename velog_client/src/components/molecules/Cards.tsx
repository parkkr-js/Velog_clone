import React, { useEffect, useState, useCallback, FC } from "react";
import CardTemplate from "../templates/CardTemplate";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { CardData as InitialCardData } from "../../assets/data/CardData";
import { Card } from "../../state/atoms/cardState";
import { useRecoilState } from "recoil";
import { tabPanelState } from "../../state/atoms/tabPanelState";

const pageSize = 8;

const Cards: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [ref, inView] = useInView({ threshold: 0 });
  const [selectedTab] = useRecoilState(tabPanelState);

  const sortCards = useCallback(() => {
    let sortedCards = [...InitialCardData];
    if (selectedTab === "1") {
      sortedCards.sort((a, b) => b.likeCount - a.likeCount);
    } else if (selectedTab === "2") {
      sortedCards.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return sortedCards;
  }, [selectedTab]);

  useEffect(() => {
    const sortedCards = sortCards();
    setCards(sortedCards.slice(0, pageSize));
    setPage(1);
    setHasMore(sortedCards.length > pageSize);
  }, [selectedTab, sortCards]);

  const loadMoreCards = useCallback(() => {
    if (hasMore) {
      const nextPage = page + 1;
      const sortedCards = sortCards();
      const nextCards = sortedCards.slice(page * pageSize, nextPage * pageSize);
      setCards((prevCards) => [...prevCards, ...nextCards]);
      setPage(nextPage);

      if (nextPage * pageSize >= sortedCards.length) {
        setHasMore(false);
      }
    }
  }, [hasMore, page, sortCards]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreCards();
    }
  }, [inView, loadMoreCards, hasMore]);

  return (
    <CardGrid>
      {cards.map((card: Card) => (
        <CardTemplate key={card.id} card={card} />
      ))}
      {hasMore && <div ref={ref}>로딩중</div>}
    </CardGrid>
  );
};

export default Cards;

const CardGrid = styled.div`
  display: grid;
  justify-content: space-between;
  align-content: space-between;
  grid-gap: 45px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

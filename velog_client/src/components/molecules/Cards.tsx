import React, { useEffect, useState, FC } from "react";
import axios from "axios"; // axios 추가
import CardTemplate from "../templates/CardTemplate";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from 'styled-components';
import { Card } from "../../state/atoms/cardState"; // 사용하는 타입 수정
import { useRecoilState, useRecoilValue } from "recoil";
import { tabPanelState } from "../../state/atoms/tabPanelState";
import theme from "../../styles/theme";

const pageSize = 1; 

const Cards: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const [ref, inView] = useInView({ threshold: 1 });
  const API = process.env.REACT_APP_API_URL;
  const selectedTab = useRecoilValue(tabPanelState);

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split("T");
    const parts = datePart.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];

      return `${year}년 ${month}월 ${day}일`;
    }
    return dateString;
  };

  useEffect(() => {
    const loadCards = async () => {
      try {

        const sortBy = selectedTab === "1" ? 'likes' : 'modifiedAt';
        const direction = selectedTab === "1" ? 'desc' : 'desc'; 
  

        const requestUrl = `${API}/api/post/articles?pageSize=${pageSize}&page=${page}`;
  
        const response = await axios.get(requestUrl);
        const data = response.data;
        const itemsArray = data.content || [];
        
        const transformedData = itemsArray.map((item: any) => ({
          id: item.postId,
          title: item.title,
          content: item.content,
          author: item.member.nickname,
          date: formatDate(item.modifiedAt),
          likeCount: item.likeCount,
          commentCount: item.commentCount,
          imageUrl: item.thumbnail,
          tags: item.tagList,
          profileImageUrl: item.member.profileImage,
        }));
        console.log("Transformed data before setting cards: ", transformedData); // 데이터 변환 확인
        setCards((prevCards) => [...prevCards, ...transformedData]);
        
        setPage((prevPage) => prevPage + 1);

        console.log("Fetched cards: ", cards);
        if (itemsArray.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };
  
    if (inView && hasMore) {
      loadCards();
    }
  }, [inView, hasMore, page, selectedTab]); 
  
  
 
  return (
    <CardGrid>
      {cards.map((card: Card) => (
        <CardTemplate key={card.id} card={card} />
      ))}
      {hasMore && <LoadingSpinner ref={ref} />}
    </CardGrid>
  );
};

export default Cards;


const CardGrid = styled.div`
  display: grid;
  justify-content: space-between;
  align-content: space-between;
  padding-top: 20px;
  grid-gap: 45px;
  grid-template-columns: repeat(5, 1fr);
  overflow-y: auto;

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


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid ${theme.colors.primary2};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  margin: 20px auto;
`;
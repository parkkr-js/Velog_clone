import React from "react";
import { CardData } from "../../assets/data/CardData";
import MyVelogCard from "../atoms/MyVelogCard";
import styled from "styled-components";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../state/atoms/cardState";

export const MyVelogCardList: React.FC = () => {
  const API = process.env.REACT_APP_API_URL;
  const user = useRecoilValue(userState);
  const [cards, setCards] = useState<Card[]>([]);
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
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${API}/api/post/articles/member/${user.memberId}`, {
          withCredentials: true 
        });
       
        setCards(response.data.map((item: any) => ({
          id: item.postId,
          title: item.title,
          author: item.member.nickname,
          content: item.content,
          date: formatDate(item.modifiedAt),
          commentCount: item.commentCount, 
          likeCount: item.likeCount,
          profileImageUrl: item.member.profileImage,
          imageUrl: item.thumbnail,
          tags: item.tagList,
        })));
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
      }
    };

    fetchCards();
  }, [user.memberId]); 

  return (
    <Div>
      {cards.map((card) => (
        <MyVelogCard key={card.id} card={card} />
      ))}
    </Div>
  );
};


const Div = styled.div`
  display: flex;
  width: 740px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

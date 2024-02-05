import { atom } from "recoil";

export interface Card {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  commentCount: string;
  likeCount: string;
  profileImageUrl: string;
  imageUrl: string;
  tags: string[];
}

export const cardState = atom<Card[]>({
  key: "cardState",
  default: [],
});

import { atom } from "recoil";

export interface Card {
  id: number;
  title: string;
  author: string;
  content: string;
  date: Date;
  commentCount: number;
  likeCount: number;
  profileImageUrl: string;
  imageUrl: string;
}

export const cardState = atom<Card[]>({
  key: "cardState",
  default: [],
});

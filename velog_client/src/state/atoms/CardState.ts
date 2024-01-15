import { atom } from "recoil";

interface Card {
  id: number;
  title: string;
  content: string;
  date: Date;
  commentCount: number;
  likeCount: number;
  imageUrl: string;
}

export const cardState = atom<Card[]>({
  key: "cardState",
  default: [],
});

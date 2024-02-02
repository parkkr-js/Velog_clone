import { atom } from "recoil";

export interface Article {
  articleId: number | null;
  title: string;
  memberId: number | null;
  content: string;
  date: Date;
  commentCount: number;
  likeCount: number;
  tags: string[];
}

export const articleState = atom<Article>({
  key: "articleState",
  default: 
    {
      articleId: null,
      title: "",
      memberId: null,
      content: "",
      date: new Date(),
      commentCount: 0,
      likeCount: 0,
      tags: [],
    },
});

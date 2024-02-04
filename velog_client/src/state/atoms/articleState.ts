import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoilPersist",
  storage: localStorage,
});

export interface Article {
  articleId: number | null;
  title: string;
  memberId: number | null;
  nickname: string;
  profileImage: string;
  content: string;
  thumbnail: string;
  date: string;
  commentCount: number;
  likeCount: number;
  tags: string[];
}

export const articleState = atom<Article>({
  key: "articleState",
  default: {
    articleId: null,
    title: "",
    thumbnail: "",
    nickname: "nullnullnull",
    profileImage: "",
    memberId: null,
    content: "",
    date: "",
    commentCount: 0,
    likeCount: 0,
    tags: ["defaultTag1", "defaultTag2", "defaultTag3"]
  },
  effects_UNSTABLE: [persistAtom],
});

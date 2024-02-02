import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: 'recoilPersist', 
  storage: localStorage, 
});

export interface User {
  memberId: number | null;
  email: string;
  name: string;
  profileImgUrl: string;
}

export const userState = atom<User>({
  key: "userState",
  default: {
    memberId: null,
    email: "",
    name: "",
    profileImgUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});

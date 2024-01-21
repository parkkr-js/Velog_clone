import { atom } from "recoil";

export interface User {
  id: number;
  name: string;
  blogName: string;
  explain: string;
  profileImageUrl: string;
}

export const userState = atom<User>({
  key: "userState",
  default: {
    id: 0,
    name: "박지성 학부생",
    explain: "참 되게 살자",
    blogName: "live_in_truth",
    profileImageUrl:
      "https://velog.velcdn.com/images/live_in_truth/profile/03d01656-a3c6-440c-822e-60269b8e102a/social_profile.jpeg",
  },
});

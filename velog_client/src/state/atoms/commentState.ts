import { atom } from "recoil";

export interface Comment {
    id: number;
    author: string;
    content: string;
    date: Date;
    profileImageUrl: string;
    parentId?: number; 
    replies?: Comment[]; 
  }
  
export const commentState = atom<Comment[]>({
    key: "commentState",
    default: [],
});
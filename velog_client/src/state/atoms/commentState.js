import { atom, selector } from 'recoil';

// 현재 로그인한 사용자의 정보를 저장하는 atom
export const currentUserState = atom({
  key: 'currentUserState', // 고유한 key
  default: null, // 기본값
});

// 댓글들의 상태를 저장하는 atom
export const commentsState = atom({
  key: 'commentsState',
  default: [], // 초기 상태는 빈 배열
});

// 특정 게시글의 댓글만 필터링하는 selector
export const commentsByPostIdState = selector({
  key: 'commentsByPostIdState',
  get: ({get}) => {
    const postId = get(currentPostIdState); // 현재 보고 있는 게시글의 ID
    const comments = get(commentsState);
    return comments.filter(comment => comment.post.id === postId);
  },
});

// 현재 보고 있는 게시글의 ID를 저장하는 atom
export const currentPostIdState = atom({
  key: 'currentPostIdState',
  default: null,
});

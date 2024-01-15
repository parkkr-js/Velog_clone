import { Card } from "../../state/atoms/CardState";

export const CardData: Card[] = [
  {
    id: 1,
    title: "실무에서 개발자는 여기까지만 알면 되는 도커 / 쿠버네티스",
    author: "박지성",
    content:
      "항해 플러스 코육대에서 행사를 연다는 소식을 한참 뒤늦게 듣고 빠르게 도전해보기 위해 연말 하루를 달려본 끝에 회고 글을 작성하게 되었네요!, 이번에 주어진 주제가 굉장히 다양했는데 저는 신년카드 메이커를 한번 만들어보고 싶더라고요! 그래서 한 번 연말에 작업을 해봤어요!",
    date: new Date("2024-01-01"),
    commentCount: 10,
    likeCount: 5,
    profileImageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "javascript - 기본 동작 원리와 v8 js 엔진",
    author: "김람람",
    content:
      "javascript 의 태생 자체는 이렇게나 많은 일을 시키려고 만들어지지 않았다. 그래서 그 근본이 조금 약한 부분은 있다. 오히려 매력적이다 시대의 변화에 맞춰서 js는 정말 다양한 특성을 가지는, 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체지향 프로그래밍 을 지원하는 멀티 패러다임 프로그래밍 언어이면서 인터프리터 언어(Interpreter language) 이다.",
    date: new Date("2024-01-02"),
    commentCount: 4,
    likeCount: 3,
    profileImageUrl:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageUrl:
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww",
  },
];

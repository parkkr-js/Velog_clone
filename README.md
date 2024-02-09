# Velog_clone 📝


# 벨로그 클론 프로젝트

<img width="102" alt="스크린샷 2024-02-09 오후 5 08 32" src="https://github.com/Park21700305/Velog_clone/assets/93187535/59c77b67-9ab0-4344-9275-2491ea4bd51d">

## 🛠 Stack

### FrontEnd

- **프레임워크**: React 🧩
- **언어**: TypeScript ⌨️, JavaScript 📜
- **스타일링**: Styled-Components 💅, MUI 🎨
- **상태 관리**: Recoil 🔫
- **인증**: Google OAuth API 🔑
- **마크다운 에디터**: Toast UI 🍞
- **배포**: Vercel 🚀
- **기타 라이브러리**: react-intersection-observer 👀, AWS SDK 📦

#### 파일 구조: 아토믹 구조

```plaintext
- src
  - api
  - assets
    - data
    - img
  - components
    - atoms
    - molecules
    - organisms
    - templates
  - pages
    - article
    - login
    - posts
    - write
    - index.tsx
    - RedirectionAfterLoginPage.tsx
  - router
  - state
    - atoms
    - selectors
  - styles
```

### BackEnd

- **프레임워크**: Spring Boot 🍃
- **ORM**: JPA (Hibernate) 🗃
- **데이터베이스**: MySQL 🛢
- **보안**: Spring Security 🔒, OAuth 🗝
- **AWS 서비스**: Elastic Beanstalk ☁️, RDS 🗄, S3 📦
- **기타 도구**: Lombok ✂️

### 벨로그 클론 API 명세서

### 게시글 API

### 게시글 목록 조회
- **GET** `/api/post/articles`
- **파라미터**: `page`, `size`, `sort`
- **응답**: `200 OK` + `Page<PostResponseDTO>`

### 게시글 생성
- **POST** `/api/post/create`
- **요청 바디**: `PostRequestDTO`
- **응답**: `200 OK` + `PostResponseDTO`

### 게시글 상세 조회
- **GET** `/api/post/articles/{postId}`
- **응답**: `200 OK` + `PostResponseDTO`

### 게시글 수정
- **PATCH** `/api/post/update/{postId}`
- **요청 바디**: `PostRequestDTO`
- **응답**: `200 OK` + `PostResponseDTO`

### 게시글 삭제
- **DELETE** `/api/post/delete/{postId}`
- **응답**: `200 OK`

### 회원별 게시글 조회
- **GET** `/api/post/articles/member/{memberId}`
- **응답**: `200 OK` + `List<PostResponseDTO>`

### 회원별 태그 조회
- **GET** `/api/post/tags/{memberId}`
- **응답**: `200 OK` + `TagsResponseDTO`

## 회원 API

### 로그아웃
- **POST** `/api/logout`
- **응답**: `204 No Content`

### 프로필 조회
- **GET** `/users/me`
- **응답**: `200 OK` + `MemberProfileResponse`

### 닉네임 중복 검사
- **GET** `/users/validation?nickname={nickname}`
- **응답**: `200 OK` + `Map<String, Boolean>`

## 인증 API

### 사용자 정보 조회
- **GET** `/api/userinfo`
- **응답**: `200 OK` + `AuthDTO` | `401 Unauthorized`


### ERD
<img width="329" alt="스크린샷 2024-02-09 오후 5 01 40" src="https://github.com/Park21700305/Velog_clone/assets/93187535/5963c7c8-7efb-49d7-8c1c-7a08d00f657a">


## Main Feature

- **무한 스크롤링**: `Pageable`과 react-intersection-observer를 사용하여 구현.
  <img width="1465" alt="스크린샷 2024-02-09 오후 4 52 10" src="https://github.com/Park21700305/Velog_clone/assets/93187535/4f72b76e-883a-4ad9-b7e7-e3ae79067a9d">

- **인증 및 인가**: Spring Security & OAuth를 이용한 강력한 보안.
  <img width="825" alt="스크린샷 2024-02-09 오후 4 53 18" src="https://github.com/Park21700305/Velog_clone/assets/93187535/1578c167-a824-47d6-b0d9-5c0b004874c0">

- **마크다운 작성 및 미리보기**: Toast UI를 활용, 다크 모드 지원.
  <img width="1470" alt="스크린샷 2024-02-09 오후 4 54 31" src="https://github.com/Park21700305/Velog_clone/assets/93187535/1bf5a7f1-2ba9-4a5b-8831-b90abd4d2ce5">
  <img width="1091" alt="스크린샷 2024-02-09 오후 4 54 51" src="https://github.com/Park21700305/Velog_clone/assets/93187535/940260c1-de04-4a39-a3d5-ebaba06007e8">

- **실시간 이미지 업로드**: 마크다운 편집 중 AWS S3를 통해 쉽게 진행.
  
- **자동 시간 관리**: 생성 및 수정 시간을 자동으로 관리하는 `Timestamped` 클래스 활용.

## 미완성 기능

- **대댓글 기능**: 엔티티는 설계되었으나 프론트엔드 로직 개선 필요.
- **백엔드 서버 HTTPS 배포**: 설정이 필요함.
- 예시 사진은 로컬환경에서 실행하였음.



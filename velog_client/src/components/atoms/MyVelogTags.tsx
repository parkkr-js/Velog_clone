import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atoms/userState";
import axios from "axios";

const MyVelogTags: React.FC = () => {
  const API = process.env.REACT_APP_API_URL;
  const [selectedTag, setSelectedTag] = useState<string>("전체보기");
  const [tags, setTags] = useState<{ [key: string]: number }>({});
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchTags = async () => {
      if (user.memberId) {
        try {
          const response = await axios.get(
            `${API}/api/post/tags/${user.memberId}`,
            {
              withCredentials: true,
            }
          );
          const tagList = response.data.tagList || [];
          console.log("Fetched tag list: ", tagList);
          const tagCounts = tagList.reduce(
            (acc: { [key: string]: number }, tag: string) => {
              acc[tag] = (acc[tag] || 0) + 1;
              return acc;
            },
            {}
          );
          setTags(tagCounts);
          console.log("Fetched tags: ", tags);
        } catch (error) {
          console.error("Failed to fetch tags:", error);
          setTags({});
        }
      }
    };

    fetchTags();
  }, [user.memberId]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    // 여기에서 선택된 태그에 따라 게시물을 필터링하는 로직을 구현할 수 있습니다.
  };

  return (
    <TagsContainer>
      <TagHeader>태그 목록</TagHeader>
      <TagItem
        selected={selectedTag === "전체보기"}
        onClick={() => handleTagClick("전체보기")}
      >
        전체보기{" "}
        <TagCount>
          ({Object.values(tags).reduce((total, count) => total + count, 0)})
        </TagCount>
      </TagItem>
      {Object.entries(tags).map(([tag, count]) => (
        <TagItem
          key={tag}
          selected={selectedTag === tag}
          onClick={() => handleTagClick(tag)}
        >
          {tag} <TagCount>({count})</TagCount>
        </TagItem>
      ))}
    </TagsContainer>
  );
};

export default MyVelogTags;

const TagsContainer = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  color: ${theme.colors.text1};
`;

const TagHeader = styled.div`
  font-size: ${theme.fontSizes.body1};
  font-weight: ${theme.fontWeights.body1};
  color: ${theme.colors.text4};
  margin-bottom: 12px;
  border-bottom: 1px solid ${theme.colors.text4};
  padding-bottom: 10px;
`;

const TagItem = styled.div<{ selected: boolean }>`
  color: ${({ selected }) =>
    selected ? theme.colors.primary1 : theme.colors.text1};
  cursor: pointer;
  margin: 5px 0;
  font-weight: ${({ selected }) =>
    selected ? theme.fontWeights.body1 : theme.fontWeights.body2};

  &:hover {
    color: ${theme.colors.primary1};
    font-weight: ${theme.fontWeights.body1};
  }
`;

const TagCount = styled.span`
  color: ${theme.colors.text3};
`;

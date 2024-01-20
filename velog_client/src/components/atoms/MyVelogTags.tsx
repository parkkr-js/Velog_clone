import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { CardData } from "../../assets/data/CardData";

const MyVelogTags: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>("전체보기");

  const tagCounts = CardData.flatMap((card) => card.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <TagsContainer>
      <TagHeader>태그 목록</TagHeader>
      <TagItem
        selected={selectedTag === "전체보기"}
        onClick={() => handleTagClick("전체보기")}
      >
        전체보기 ({CardData.length})
      </TagItem>
      {Object.entries(tagCounts).map(([tag, count]) => {
        if (tag !== "전체보기") {
          return (
            <TagItem
              key={tag}
              selected={selectedTag === tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag} ({count})
            </TagItem>
          );
        }
        return null;
      })}
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
  background-color: transparent;
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

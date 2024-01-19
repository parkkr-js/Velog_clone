import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import theme from "../../styles/theme";

type TagType = {
  id: number;
  name: string;
};

type FormData = {
  tagInput: string;
};

const TagsEditor: React.FC = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const tagInput = watch("tagInput");
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit: SubmitHandler<FormData> = ({ tagInput }) => {
    const newTag = tagInput.trim();
    if (newTag) {
      setTags((prevTags) => [...prevTags, { id: Date.now(), name: newTag }]);
      setValue("tagInput", "");
    }
  };

  const removeTag = (id: number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <TagInputContainer onSubmit={handleSubmit(onSubmit)}>
      {tags.map((tag) => (
        <Tag key={tag.id} onClick={() => removeTag(tag.id)}>
          {tag.name}
        </Tag>
      ))}
      <TagInputField
        onFocus={() => setIsFocused(true)}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        {...register("tagInput")}
        placeholder="태그를 입력하세요"
        onKeyDown={(e) => {
          if (e.key === "\n" && !isComposing) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
        value={tagInput || ""}
      />
      {isFocused && (
        <HelpText>
          엔터(Enter)를 입력하여 태그를 등록할 수 있습니다. 등록된 태그를
          클릭하면 삭제됩니다.
        </HelpText>
      )}
    </TagInputContainer>
  );
};

export default TagsEditor;

const TagInputContainer = styled.form`
  background-color: ${theme.colors.background3};
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: ${theme.colors.background3};
  color: ${theme.colors.primary1};
  padding: 4px 8px;
  border-radius: 15px;
  cursor: pointer;
`;

const TagInputField = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  flex-grow: 1;
  &::placeholder {
    color: #555;
  }
`;

const HelpText = styled.div`
  color: ${theme.colors.primary1};
  font-size: 12px;
  margin-top: 8px;
`;

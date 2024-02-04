import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, TextField, Typography, Box } from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import theme from '../../styles/theme';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

// 대댓글 입력 컴포넌트
const ReplyInput = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <StyledTextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="대댓글을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin="dense"
      />
      <StyledButton type="submit" variant="contained" size="small">답글 달기</StyledButton>
    </Box>
  );
};

// 댓글 및 대댓글 표시 컴포넌트
const Comment = ({ comment }) => {
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplySubmit = (replyText) => {
    const newReply = {
      id: replies.length + 1,
      nickname: "익명",
      userProfile: "",
      content: replyText,
      date: new Date().toISOString(),
    };
    setReplies([...replies, newReply]);
  };

  return (
    <CommentContainer>
      <Avatar src={comment.userProfile} alt="Profile" sx={{ width: 48, height: 48 }} />
      <CommentContent>
        <CommentHeader>
          <UserName>{comment.nickname}</UserName>
          <CommentDate>{moment(comment.date).fromNow()}</CommentDate>
        </CommentHeader>
        <CommentText>{comment.content}</CommentText>
        <Button size="small" onClick={() => setShowReplyInput(!showReplyInput)}>답글</Button>
        {showReplyInput && <ReplyInput onSubmit={handleReplySubmit} />}
        {replies.length > 0 && replies.map((reply) => (
          <ReplyContainer key={reply.id}>
            <Comment comment={reply} />
          </ReplyContainer>
        ))}
      </CommentContent>
    </CommentContainer>
  );
};

export default Comment;

// Styled Components 및 MUI 스타일 통합
const CommentContainer = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(1, 0),
}));

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = muiStyled(Typography)({
  fontWeight: 'bold',
  color: theme.colors.text1,
});

const CommentDate = muiStyled(Typography)({
  color: theme.colors.text3,
});

const CommentText = muiStyled(Typography)({
  color: theme.colors.text2,
});

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const StyledTextField = muiStyled(TextField)({
  '& .MuiOutlinedInput-root': {
    fontSize: '0.875rem',
  },
});

const StyledButton = muiStyled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));


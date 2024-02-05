import { useLocation } from 'react-router-dom'; // Import useLocation
import styled from "styled-components";
import theme from "../../styles/theme";
import { userState } from "../../state/atoms/userState";
import { articleState } from "../../state/atoms/articleState";
import { useRecoilValue } from "recoil";

const MyVelogProfileSection: React.FC = () => {
  const location = useLocation(); 
  const user = useRecoilValue(userState);
  const article = useRecoilValue(articleState);

  const isPostPage = location.pathname === '/posts';

  const profileImage = isPostPage ? user.profileImgUrl : article.profileImage;
  const nickname = isPostPage ? user.name : article.nickname;
  const profileExplain = "프로필 설명 글"; 

  return (
    <Div>
      <ProfileImage src={profileImage} />
      <ProfileInfo>
        <ProfileName>{nickname}</ProfileName>
        <ProfileExplain>{profileExplain}</ProfileExplain>
      </ProfileInfo>
    </Div>
  );
};
export default MyVelogProfileSection;


const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 740px;
  justify-content: flex-start;
  padding-bottom: 30px;
  border-bottom: 2px solid ${theme.colors.background3};
  margin-bottom: 20px;
  font-family: "Noto Sans KR", sans-serif;
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileExplain = styled.p`
  font-size: ${theme.fontSizes.button1};
  font-weight: ${theme.fontWeights.body2};
  color: ${theme.colors.text1};
`;

const ProfileInfo = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ProfileName = styled.div`
  font-size: ${theme.fontSizes.subtitle};
  font-weight: ${theme.fontWeights.header1};
  color: ${theme.colors.text1};
`;

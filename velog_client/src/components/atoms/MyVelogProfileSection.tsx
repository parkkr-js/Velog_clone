import styled from "styled-components";
import theme from "../../styles/theme";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";

const MyVelogProfileSection: React.FC = () => {
  const DemoUser = useRecoilValue(userState);
  return (
    <Div>
      <ProfileImage src={DemoUser.profileImgUrl} />
      <ProfileInfo>
        <ProfileName>{DemoUser.name}</ProfileName>
        <ProfileExplain>아직 설정 안함</ProfileExplain>
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

import styled from "styled-components";
import theme from "../../styles/theme";
import { userState } from "../../state/atoms/userState";
import { useRecoilValue } from "recoil";

const MyVelogProfileSection: React.FC = () => {
  const DemoUser = useRecoilValue(userState);
  return (
    <Div>
      <ProfileImage src={DemoUser.profileImageUrl} />
      <ProfileInfo>
        <ProfileName>{DemoUser.name}</ProfileName>
        <ProfileExplain>{DemoUser.explain}</ProfileExplain>
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
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileExplain = styled.text`
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

import Template from "../../components/templates";
import { homeState } from "../../state/atoms/homeState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { MyVelogCardsTemplate } from "../../components/templates/MyVelogCardsTemplate";
const Posts: React.FC = () => {
    const [, setIsHome] = useRecoilState(homeState);
    useEffect(() => {
        setIsHome(false);
    }, []);
  return (
    <>
      <Template />
      <MyVelogCardsTemplate />
    </>
  );
}

export default Posts;
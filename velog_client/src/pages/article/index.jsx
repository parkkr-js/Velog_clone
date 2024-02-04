import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { articleState } from "../../state/atoms/articleState";
import Template from "../../components/templates";
import ArticleDetailTemplate from "../../components/templates/ArticleDetailTemplate";
import { useRecoilValue } from "recoil";

const ArticleDetailPage = () => {
  

  return (
    <>
      <Template />
      <ArticleDetailTemplate />
    </>
  );
};

export default ArticleDetailPage;

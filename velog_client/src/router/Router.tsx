import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages";
import NavBar from "../components/organisms/NavBar";
import Write from "../pages/write";
import Posts from "../pages/posts";
import { userState } from "../state/atoms/userState";
import { useRecoilValue } from "recoil";
import { articleState } from "../state/atoms/articleState";
import ArticleDetailPage from "../pages/article";
import { useLocation } from "react-router-dom";
import RedirectionAfterLoginPage from "../pages/RedirectionAfterLoginPage";
import EditArticle from "../components/templates/EditArticle";

function ConditionalNavBar() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(!location.pathname.startsWith("/write"));
  }, [location]);

  return showNavBar ? <NavBar /> : null;
}

function Router() {
  return (
    <BrowserRouter>
      <ConditionalNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/oauth2/redirect"
          element={<RedirectionAfterLoginPage />}
        />
        <Route path="/trending/week" element={<Home />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:articleId" element={<EditArticle />} />
        <Route path="/edit" element={<ArticleDetailPage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/postdetail/:articleId" element={<ArticleDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

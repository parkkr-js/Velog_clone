import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages";
import NavBar from "../components/organisms/NavBar";
import Write from "../pages/write";
import Posts from "../pages/posts";
import { userState } from "../state/atoms/userState";
import { useRecoilValue } from "recoil";
import ArticleDetailPage from "../pages/article";
import { useLocation } from "react-router-dom";

function ConditionalNavBar() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/write");
  }, [location]);

  return showNavBar ? <NavBar /> : null;
}

function Router() {
  const user = useRecoilValue(userState);

  return (
    <BrowserRouter>
      <ConditionalNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/oauth2/redirect" element={<BlankPage />} /> */}
        <Route path="/trending/week" element={<Home />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path={`/@${user.blogName}/:cardId`}
          element={<ArticleDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

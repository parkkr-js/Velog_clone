import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../pages";
import NavBar from "../components/organisms/NavBar";
import Write from "../pages/write";
import Posts from "../pages/posts";

function ConditionalNavBar() {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    setShowNavBar(location.pathname !== "/write");
  }, [location]);

  return showNavBar ? <NavBar /> : null;
}

function Router() {
  return (
    <BrowserRouter>
      <ConditionalNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending/week" element={<Home />} />
        <Route path="/recent" element={<Home />} />
        <Route path="/feed" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

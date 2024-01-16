import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages";
import NavBar from "../components/organisms/NavBar";

function Router() {
  return (
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending/week" element={<Home />} />
        <Route path="/recent" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}
export default Router;

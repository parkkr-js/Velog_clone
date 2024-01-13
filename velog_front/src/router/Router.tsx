import { Routes, Route } from "react-router-dom";
import Home from "../pages";
import { BrowserRouter } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
  );
}
export default Router;

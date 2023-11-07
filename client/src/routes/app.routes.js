import { Home } from "../pages/Home/Home";
import { SignIn } from "../components/SignIn/SignIn";
import { SignUp } from "../components/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import RedirectHome from "../pages/SignIn/redirect";


const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<RedirectHome />} />
    <Route path="home/" element={<Home />} />
    <Route path="signin/" element={<SignIn />} />
    <Route path="signup/" element={<SignUp />} />
  </Routes>
);

export default AppRoutes;

import { HomePage, SignInPage, SignUpPage } from "../pages";
import { Route, Routes } from "react-router-dom";
import Redirect from "../pages/Redirect";
import Chat from "../components/Room/Chat/Chat";


const AppRoutes = () => (
  <Routes>
    {/* <Route path="*" element={<Redirect path="/home" />} /> */}
    <Route path="/" element={<HomePage />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </Routes>
);

export default AppRoutes;

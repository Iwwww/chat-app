import { HomePage, AboutPage, SignInPage, SignUpPage } from "../pages/index.js";
import { Route, Routes } from "react-router-dom";
import Redirect from "../pages/Redirect";
import { ChatPage } from "../pages/ChatPage/ChatPage.jsx";
import { ChatsListPage } from "../pages/ChatsListPage/AboutPage.jsx";

const AppRoutes = () => (
  <Routes>
    {/* <Route path="*" element={<Redirect path="/home" />} /> */}
    <Route path="/" element={<HomePage />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/chats_list" element={<ChatsListPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </Routes>
);

export default AppRoutes;

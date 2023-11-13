import React from "react";
import { Room } from "../../components/Room/Room";
import useAuth from "../../hooks/useAuth";
import Redirect from "../Redirect";

export const ChatPage = () => {
  const { isAuth } = useAuth();

  console.log("isAuth:", isAuth ? "true" : "false");
  return isAuth ? <Room /> : <Redirect path="/signin" />;
};

import React from "react";
import { Room } from "../../components/Room/Room";
import useUser from "../../hooks/useUser";
import Redirect from "../Redirect";

export const ChatPage = () => {
  const { isAuth } = useUser();

  return isAuth ? <Room /> : <Redirect path="/signin" />;
};

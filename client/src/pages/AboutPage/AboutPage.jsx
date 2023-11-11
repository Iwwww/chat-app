import React from "react";
import { Room } from "../../components/Room/Room";
import useUser from "../../hooks/useUser";
import Redirect from "../Redirect";

export const HomePage = () => {
  // const {  } = useUser();

  return isAuthenticated() ? <Room /> : <Redirect path="/signin" />;
};

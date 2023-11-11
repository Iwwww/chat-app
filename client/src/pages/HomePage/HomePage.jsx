import React from "react";
import { Room } from "../../components/Room/Room";
import useUser from "../../hooks/useUser";
import Redirect from "../Redirect";

export const HomePage = () => {
  const { isAuth } = useUser();

  return <h1>Home</h1>;
};

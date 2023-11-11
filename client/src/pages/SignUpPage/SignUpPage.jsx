import React from "react";
import { SignUp } from "../../components/";
import useUser from "../../hooks/useUser";
import Redirect from "../Redirect";

export const SignUpPage = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated() ? <Redirect path="/home" /> : <SignUp />;
};

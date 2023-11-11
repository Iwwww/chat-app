import React from "react";
import { SignIn } from "../../components/SignIn/SignIn";
import useUser from "../../hooks/useUser";
import Redirect from "../Redirect";

export const SignInPage = () => {
  const { isAuthenticated } = useUser();

  return isAuthenticated() ? <Redirect path="/" /> : <SignIn />;
};

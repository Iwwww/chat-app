import React from "react";
import { SignIn } from "../../components/SignIn/SignIn";
import useAuth from "../../hooks/useAuth";
import Redirect from "../Redirect";

export const SignInPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Redirect path="/" /> : <SignIn />;
};

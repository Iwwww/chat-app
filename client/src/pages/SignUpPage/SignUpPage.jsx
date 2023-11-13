import React from "react";
import { SignUp } from "../../components/";
import useAuth from "../../hooks/useAuth";
import Redirect from "../Redirect";

export const SignUpPage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Redirect path="/home" /> : <SignUp />;
};

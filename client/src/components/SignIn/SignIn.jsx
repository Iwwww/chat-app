import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

export const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const { getUser, setUser, setToken, isAuthenticated } = useUser();

  useEffect(() => {
    nameInputRef.current.focus();
    if (isAuthenticated()) {
      console.log("user:", getUser());
      console.log("Authenticated");
    } else {
      console.log("Not Authenticated");
    }
  }, []);

  const isValid = (string) => {
    const isFieldEmpty = string === "";
    const hasWhiteSpace = /\s/g.test(string);
    const isValidLength = string.length > 3;
    if (isFieldEmpty) {
      return false;
    }
    if (hasWhiteSpace) {
      return false;
    }
    if (!isValidLength) {
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    event.stopPropagation();
    const name = nameInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (!isValid(name)) {
      nameInputRef.current.focus();
      return;
    }
    if (!isValid(password)) {
      passwordInputRef.current.focus();
      return;
    }

    const data = {
      username: name,
      password: password,
    };
    axios
      .post(process.env.REACT_APP_SERVER_API + "/auth/signin", data)
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);
      })
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message) {
            setErrorMessage(err.response.data.message);
          }
        } else {
          setErrorMessage("Some error occurred while signing in");
        }
      });
  };

  const onSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="content">
      <div className="index-signin">
        <div className="form-header">
          <h2 className="center">Sign In</h2>
        </div>
        <div className="form vertical">
          {errorMessage ? (
            <div className="error-container">
              <p>{errorMessage}</p>
            </div>
          ) : (
            <div></div>
          )}
          <div className="input-box">
            <input
              type="text"
              placeholder=""
              ref={nameInputRef}
              pattern="[_\-0-9A-z]{4,}"
            ></input>
            <label>Name</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder=""
              ref={passwordInputRef}
              pattern=".{4,}"
            ></input>
            <label>Password</label>
          </div>
          <input type="submit" value="Sign In" onClick={onSubmit}></input>
          <input
            className="signup-btn"
            type="button"
            value="Sign Up"
            onClick={onSignup}
          ></input>
        </div>
      </div>
    </div>
  );
};

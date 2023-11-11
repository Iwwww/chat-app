import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    nameInputRef.current.focus();
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
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (!isValid(name)) {
      nameInputRef.current.focus();
      return;
    }
    if (!isValid(email)) {
      emailInputRef.current.focus();
      return;
    }
    if (!isValid(password)) {
      passwordInputRef.current.focus();
      return;
    }

    const body = {
      username: username,
      email: email,
      password: password,
      roles: ["user"],
    };
    axios
      .post("http://localhost:4000/api/auth/signup", body)
      .then((res) => console.log(res))
      .then((res) => navigate("/signin"))
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(err.response.data);
          if (err.response.data.message) {
            setErrorMessage(err.response.data.message);
          }
          // console.log(err.response.status);
          // console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          // console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", err.message);
        }
      });
  };

  const onSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="content">
      <div className="index-signin">
        <div className="form-header">
          <div className="form vertical">
            <h2 className="center">Sign Up</h2>
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
                onChange={(event) => setUsername(event.target.value)}
                pattern="[_\-0-9A-z]{4,}"
              ></input>
              <label>Name</label>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder=""
                ref={emailInputRef}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              <label>Email</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder=""
                ref={passwordInputRef}
                onChange={(event) => setPasword(event.target.value)}
                pattern=".{4,}"
              ></input>
              <label>Password</label>
            </div>
            <input type="submit" value="Sign Up" onClick={onSubmit}></input>
            <input
              className="signup-btn"
              type="button"
              value="Sign In"
              onClick={onSignin}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

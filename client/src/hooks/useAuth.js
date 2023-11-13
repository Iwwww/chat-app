import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// TODO:
// 1. Go away from states use only cookies
export default function useAuth() {
  const [user, setUserState] = useState(JSON.stringify(Cookies.get("user")));
  const [token, setTokenState] = useState(Cookies.get("token"));
  const [isAuth, setIsAuth] = useState(() => {
    if (Cookies.get("user")) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    // fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get(process.env.REACT_APP_SERVER_API + "/auth/data")
      .then((res) => {
        console.log("auth/data:", JSON.stringify(res.data.user));

        if (res.data.user) {
          setUser(res.data.user);
          console.log("cookies: user:", Cookies.get("user"));
        } else {
          throw Error("No user in request.");
        }
        if (res.data.token) {
          setToken(res.data.token);
          console.log("cookies: token:", Cookies.get("token"));
        } else {
          throw Error("No token in request.");
        }
      })
      .catch((err) => {
        console.error(
          err.message
            ? err.message
            : "An error occurred while fetching user data",
        );
      });
  };

  const signout = async () => {
    axios
      .post(process.env.REACT_APP_SERVER_API + "/auth/signout")
      .then((res) => {
        Cookies.remove("user");
        Cookies.remove("token");
        window.location.reload();
        console.log(res.data?.message);
      })
      .catch((err) => {
        console.log(err.message || "An error occuer while signout");
      });
  };

  const getUser = () => {
    if (!user) {
      const cookiesUser = Cookies.get("user");
      if (cookiesUser) {
        setUser(JSON.parse(cookiesUser));
      } else {
        fetchUser();
      }
    }

    return JSON.parse(JSON.parse(user));
  };

  const getToken = () => {
    return token;
  };

  const setUser = (user) => {
    const stringUser = JSON.stringify(user);
    console.log("stringUser:", stringUser);
    setUserState(stringUser);
    Cookies.set("user", stringUser);
  };

  const setToken = (token) => {
    setTokenState(token);
    Cookies.set("token", token);
  };

  const isAuthenticated = () => {
    if (Cookies.get("user")) {
      return true;
    } else {
      return false;
    }
  };

  return {
    fetchUser,
    getUser,
    getToken,
    setUser,
    setToken,
    isAuthenticated,
    signout,
    isAuth,
  };
}

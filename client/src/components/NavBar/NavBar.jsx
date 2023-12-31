import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { isAuth, signout, getUser } = useAuth();

  return (
    <header>
      <nav className="nav">
        <CustomLink to="/" className="site-title">
          This site
        </CustomLink>
        <ul>
          {isAuth ? <CustomLink to="/chat">Chat</CustomLink> : null}
          {isAuth ? <CustomLink to="/chats_list">Chats List</CustomLink> : null}
          {isAuth ? <CustomLink to="/">{getUser().username}</CustomLink> : null}
          <CustomLink to="/about">About</CustomLink>
          {isAuth ? (
            <CustomLink to="/signin" onClick={signout}>
              Sign Out
            </CustomLink>
          ) : (
            // <a onClick={signout}>Sign Out</a>
            <CustomLink to="/signin">Sign In</CustomLink>
          )}
        </ul>
      </nav>
    </header>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export { NavBar };

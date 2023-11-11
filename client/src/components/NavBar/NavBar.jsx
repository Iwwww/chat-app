import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import useUser from "../../hooks/useUser";

const NavBar = () => {
  const { isAuth, signout } = useUser();

  return (
    <header>
      <nav className="nav">
        <a className="site-title">Site title</a>
        <ul>
          <CustomLink to="/">Home</CustomLink>
          {isAuth ? <CustomLink to="/chat">Chat</CustomLink> : null}
          <CustomLink to="/about">About</CustomLink>
          {isAuth ? (
            <CustomLink to="/signin" onClick={signout}>Sign Out</CustomLink>
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

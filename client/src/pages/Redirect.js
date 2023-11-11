import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({path}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Rediracting to", path)
    navigate(path);
  });

  return <p>redirecting to {path}</p>;
};

export default Redirect;

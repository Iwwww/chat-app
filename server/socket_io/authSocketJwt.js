import jwt from "jsonwebtoken";

function auth(socket, next) {
  const token = socket.handshake.auth?.token;
  console.log("io token:", token);

  try {
    if (!token) {
      throw { message: "Token is not provided." };
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        throw { message: "Not authorized." };
      }

      socket.user = decode;
    });

    console.log("Auhterized!");
    return next;
  } catch (err) {
    console.log(err.message);
    return;
    // next(new Error(err.message));
  }
}

export default auth;

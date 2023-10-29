import React from "react";
import { InputName } from "../../components/InputName/InputName";
import { Room } from "../../components/Room/Room";
import { USER_KEY } from "../../constants";
import storage from "../../utils/storage";

export const Home = () => {
  const user = storage.get(USER_KEY);
  console.info(`User: ${JSON.stringify(user)}`);

  return user ? <Room /> : <InputName />;
};

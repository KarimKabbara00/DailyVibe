import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Props {
  setAccessToken: (at: string) => void;
  setRefreshToken: (rt: string) => void;
}

export const SignIn: React.FC<Props> = ({
  setAccessToken,
  setRefreshToken,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username, password);
    axios
      .post("http://127.0.0.1:8000/api/signin/", {
        username: username,
        password: password,
      })
      .then((res) => {
        setAccessToken(res.data.access);
        setRefreshToken(res.data.refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        ></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          placeholder="Password"
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

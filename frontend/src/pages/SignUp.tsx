import React, { useState } from "react";
import axios from "axios";

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const registerUser = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(username, password, confirmPassword);
    axios
      .post("http://127.0.0.1:8000/api/signup/", {
        username: username,
        password1: password,
        password2: confirmPassword,
      })
      .then((res) => console.log(res.data))
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
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

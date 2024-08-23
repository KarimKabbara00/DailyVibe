import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSpring, animated } from "@react-spring/web";
import { InputField } from "components/Accounts/InputField";
import { Button } from "components/Misc/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    const loadingToast = toast.loading("Signing you in...");
    axios
      .post(
        `${baseUrl}/api/signin/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        Cookies.set("accessToken", res.data.access);
        Cookies.set("refreshToken", res.data.refresh);
        toast.remove(loadingToast);
        toast.success("Signed in!");
        navigate("/myvibe");
      })
      .catch((err) => {
        toast.remove(loadingToast);
        toast.error("Invalid credentials.");
      });
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <animated.div style={fadeIn} className="w-full h-contentHeight">
      <div className="mx-auto w-[32rem] smScreen:w-[28rem] xsScreen:w-[20rem] mt-32">
        <h1 className="mb-4">Welcome back 👋</h1>
        <form className="flex flex-col w-full gap-y-7" onSubmit={signIn}>
          <InputField
            value={username}
            setValue={setUsername}
            type="text"
            placeholder="Username"
          />
          <InputField
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Password"
          />
          <div className="w-full flex xsScreen:flex-col-reverse xsScreen:items-start xsScreen:gap-y-3 justify-between items-end">
            <span>
              Don't have an account?{" "}
              <span
                onClick={goToSignUp}
                className="underline hover:text-secondary cursor-pointer"
              >
                Sign up
              </span>
              .
            </span>
            <Button text="Sign In" disabled={false} />
          </div>
        </form>
      </div>
    </animated.div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { InputField } from "components/Accounts/InputField";
import { Button } from "components/Misc/Button";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordReqMet, setPasswordReqMet] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (!passwordReqMet) {
      toast.error("Password requirements not met!");
      return;
    }
    const loadingToast = toast.loading("Creating account...");
    axios
      .post(
        `${baseUrl}/api/signup/`,
        {
          username: username,
          password1: password,
          password2: confirmPassword,
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
        toast.success("Account created! Sign in.");
        toast.remove(loadingToast);
        navigate("/signin");
      })
      .catch((err) => {
        toast.remove(loadingToast);
        let err_response = err.response;
        console.log(err_response);
        if (!err_response) {
          toast.error("Error signing up. Try again.");
          return;
        } else if (err.response.data.error.username) {
          toast.error(err.response.data.error.username[0]);
        }
      });
  };

  useEffect(() => {
    setPasswordReqMet(password.length >= 8 && password === confirmPassword);
  }, [password, confirmPassword]);

  const goToSignIn = () => {
    navigate("/signin");
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <animated.div style={fadeIn} className="w-full h-contentHeight">
      <div className="mx-auto w-[32rem] smScreen:w-[28rem] xsScreen:w-[20rem] mt-32">
        <h1 className="mb-4">Create an account 👋</h1>
        <form className="flex flex-col w-full gap-y-7" onSubmit={registerUser}>
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
          <InputField
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
            placeholder="Confirm Password"
          />
          <div
            style={{ borderColor: passwordReqMet ? "green" : "red" }}
            className="border-2 p-1.5 rounded-standard w-full h-fit"
          >
            <span className="font-bold text-lg">Password must:</span>
            <ul className="text-base">
              <li>
                {password.length >= 8 && (
                  <span className="text-green-600 text-lg">✔ </span>
                )}
                {password.length < 8 && (
                  <span className="text-red-600 text-lg">✖ </span>
                )}
                <span>Contain at least 8 characters.</span>
              </li>
              <li>
                {password === confirmPassword && password.length > 0 && (
                  <span className="text-green-600 text-lg">✔ </span>
                )}
                {(password !== confirmPassword || password.length === 0) && (
                  <span className="text-red-600 text-lg">✖ </span>
                )}
                <span>Match confirm password.</span>
              </li>
            </ul>
          </div>
          <div className="w-full flex xsScreen:flex-col-reverse xsScreen:items-start xsScreen:gap-y-3 justify-between items-end">
            <span>
              Already have an account?{" "}
              <span
                onClick={goToSignIn}
                className="underline hover:text-secondary cursor-pointer"
              >
                Sign In
              </span>
              .
            </span>
            <Button text="Sign Up" disabled={false} />
          </div>
        </form>
      </div>
    </animated.div>
  );
};

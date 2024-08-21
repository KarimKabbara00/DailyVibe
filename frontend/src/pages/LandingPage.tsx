import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { EmojiCarousel } from "components/LandingPage/EmojiCarousel";

export const LandingPage = () => {
  const navigate = useNavigate();
  const newAccount = () => {
    navigate("/signup");
  };

  const signIn = () => {
    navigate("/signin");
  };

  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const buttonHoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#DBAB1E" : "#2F6690",
    color: buttonHovered ? "black" : "white",
    config: { duration: 75 },
  });

  return (
    <div className="w-full h-full flex flex-col items-center pt-[22rem]">
      <h1>Welcome to Daily Vibe</h1>
      <h2>A daily mood tracker.</h2>
      <EmojiCarousel />
      <animated.button
        style={buttonHoverAnim}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        type="button"
        className=" py-1.5 px-2 mt-5 border-0"
        onClick={newAccount}
      >
        Sign Up
      </animated.button>
      <animated.button
        style={buttonHoverAnim}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        type="button"
        className=" py-1.5 px-2 mt-5 border-0"
        onClick={signIn}
      >
        Sign In
      </animated.button>
    </div>
  );
};

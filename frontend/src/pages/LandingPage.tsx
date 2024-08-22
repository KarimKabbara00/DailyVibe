import React from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { EmojiCarousel } from "components/LandingPage/EmojiCarousel";
import { Button } from "components/Misc/Button";

export const LandingPage = () => {
  const navigate = useNavigate();
  const newAccount = () => {
    navigate("/signup");
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <animated.div style={fadeIn} className="w-full h-full flex flex-col items-center pt-[22rem]">
      <h1>Welcome to Daily Vibe</h1>
      <h2>A daily mood tracker.</h2>
      <EmojiCarousel />
      <form onSubmit={newAccount} className="mt-6">
        <Button text="Get Started" />
      </form>
    </animated.div>
  );
};

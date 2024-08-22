import React, { memo } from "react";
import { useSpring, animated } from "@react-spring/web";

export const EmojiCarousel = memo(() => {
  const slideLeft = useSpring({
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-100%)" },
    config: { duration: 10000 },
    loop: true,
    reset: true,
  });

  return (
    <div className="relative flex max-w-96 overflow-x-hidden overflow-y-hidden mt-3">
      <div className="absolute z-20 left-0 bottom-0 top-0 bg-gradient-to-r from-white to-transparent w-2"></div>
      <animated.div
        style={slideLeft}
        className="z-10 flex gap-x-5 select-none text-3xl"
      >
        <span>😁</span>
        <span>😄</span>
        <span>😃</span>
        <span>😊</span>
        <span>😐</span>
        <span>😟</span>
        <span>😤</span>
        <span>😡</span>
        <span className="w-[0.1rem]"></span>
      </animated.div>

      <animated.div
        style={slideLeft}
        className="flex gap-x-5 select-none text-3xl"
      >
        <span>😁</span>
        <span>😄</span>
        <span>😃</span>
        <span>😊</span>
        <span>😐</span>
        <span>😟</span>
        <span>😤</span>
        <span>😡</span>
        <span className="w-[0.1rem]"></span>
      </animated.div>
      <div className="absolute z-20 right-0 bottom-0 top-0 bg-gradient-to-l from-white to-transparent w-2"></div>
    </div>
  );
});

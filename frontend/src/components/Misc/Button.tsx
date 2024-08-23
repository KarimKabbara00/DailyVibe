import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface Props {
  text: string;
  disabled: boolean;
}

export const Button: React.FC<Props> = ({ text, disabled }) => {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const buttonHoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#DBAB1E" : "#2F6690",
    color: buttonHovered ? "white" : "white",
    opacity: disabled ? 0.4 : 1,
    config: { duration: 75 },
  });

  return (
    <animated.button disabled={disabled} style={buttonHoverAnim} onMouseEnter={() => setButtonHovered(true)} onMouseLeave={() => setButtonHovered(false)} type="submit" className="text-base smScreen:px-4 py-1.5 px-5 border-0 disabled:cursor-not-allowed">
      {text}
    </animated.button>
  );
};

import { useSpring, animated } from "@react-spring/web";
import React, { useEffect, useState } from "react";

interface Props {
  value: string;
  setValue: (v: string) => void;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<Props> = ({
  value,
  setValue,
  type,
  placeholder,
}) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const labelAnim = useSpring({
    transform: inputFocused ? "translate(-2%, -145%)" : "translate(0%, -50%)",
    fontSize: inputFocused ? "0.87rem" : "1rem",
  });

  useEffect(() => {
    setInputFocused(value.length > 0);
  }, [value]);

  return (
    <div className="relative">
      <animated.label
        style={labelAnim}
        className="absolute px-0.5 text-neutral-600 bg-white left-2 top-1/2 z-20 pointer-events-none"
        htmlFor={placeholder}
      >
        {placeholder}
      </animated.label>
      <input
        required
        name={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={type}
        className="relative z-10 p-1 pl-2 border-2 border-primary rounded-standard w-full focus:outline-secondary"
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false || value.length > 0)}
      ></input>
    </div>
  );
};

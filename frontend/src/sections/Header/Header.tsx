import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  accessToken: string;
  setAccessToken: (at: string) => void;
}

export const Header: React.FC<Props> = ({ accessToken, setAccessToken }) => {
  const navigate = useNavigate();
  const signOut = () => {
    setAccessToken("");
    navigate("/welcome");
  };

  return (
    <nav className="bg-primary flex items-center px-standard justify-between w-full h-navHeight">
      <div className="text-white w-fit h-fit  pb-1 text-4xl font-bold">
        Daily Vibe
      </div>
      {accessToken.length > 0 && (
        <div
          onClick={signOut}
          className="text-white text-xl cursor-pointer hover:underline"
        >
          Sign Out
        </div>
      )}
    </nav>
  );
};

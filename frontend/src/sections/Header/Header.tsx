import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const signOut = () => {
    Cookies.remove("accessToken");
    navigate("/welcome");
  };

  const goToSignIn = () => {
    Cookies.remove("accessToken");
    navigate("/signin");
  };

  const goToMyVibe = () => {
    Cookies.get("accessToken") ? navigate("/myvibe") : navigate("/welcome");
  };

  return (
    <nav className="bg-primary flex items-center xsScreen:px-[1.5rem] px-standard justify-between w-full h-navHeight">
      <div
        className="text-white w-fit h-fit xsScreen:pb-0 pb-1 xsScreen:text-3xl text-4xl font-bold cursor-pointer"
        onClick={goToMyVibe}
      >
        Daily Vibe
      </div>
      {Cookies.get("accessToken") &&
        Cookies.get("accessToken") !== "DEMO ACCESS TOKEN" && (
          <div
            onClick={signOut}
            className="text-white text-xl cursor-pointer hover:underline"
          >
            Sign Out
          </div>
        )}
      {(!Cookies.get("accessToken") ||
        Cookies.get("accessToken") === "DEMO ACCESS TOKEN") && (
        <div
          onClick={goToSignIn}
          className="text-white text-xl cursor-pointer hover:underline"
        >
          Sign In
        </div>
      )}
    </nav>
  );
};

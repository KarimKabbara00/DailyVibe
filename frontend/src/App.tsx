import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { MyVibe } from "./pages/MyVibe";
import { Header } from "sections/Header/Header";
import { ViewVibe } from "pages/ViewVibe";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";

function App() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  return (
    <div className="w-full h-full overflow-hidden">
      <BrowserRouter>
        <Header accessToken={accessToken} setAccessToken={setAccessToken} />
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/myvibe" element={<MyVibe />} />
          <Route path="/vibe" element={<ViewVibe />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={
              <SignIn
                setAccessToken={setAccessToken}
                setRefreshToken={setRefreshToken}
              />
            }
          />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

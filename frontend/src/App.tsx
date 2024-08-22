import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { MyVibe } from "./pages/MyVibe";
import { Header } from "sections/Header/Header";
import { ViewVibe } from "pages/ViewVibe";
import { SignUp } from "pages/SignUp";
import { SignIn } from "pages/SignIn";
import { PageNotFound } from "pages/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/myvibe" element={<MyVibe />} />
          <Route path="/vibe" element={<ViewVibe />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        containerStyle={{
          top: "5rem",
        }}
      />
    </div>
  );
}

export default App;

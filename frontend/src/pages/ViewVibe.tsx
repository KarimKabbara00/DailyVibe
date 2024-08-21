import React, { useEffect, useState } from "react";
import { VibeEntry } from "sections/ViewVibe/VibeEntry";
import { useLocation, useNavigate } from "react-router-dom";

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

export const ViewVibe: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [vibe, setVibe] = useState<Vibe>();

  const goBack = () => {
    navigate("/myvibe");
  };

  useEffect(() => {
    const { data } = state;
    !data ? navigate("/myvibe") : setVibe(data);
  }, [navigate, state]);

  useEffect(() => {}, []);
  return (
    <div className="p-standard h-full">
      <div className="cursor-pointer mb-4 text-2xl hover:underline hover:text-secondary" onClick={goBack}>
        {"<"} Back
      </div>
      {vibe && <VibeEntry vibe={vibe} />}
    </div>
  );
};

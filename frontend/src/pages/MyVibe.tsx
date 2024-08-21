import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { VibeChart } from "sections/MyVibe/VibeChart";
import { DailyVibe } from "sections/MyVibe/DailyVibe";
import { fakeVibes } from "fakeData";
import { useSpring, animated } from "@react-spring/web";

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

export const MyVibe = () => {
  const [vibes, setVibes] = useState<Vibe[]>();
  const [selectedVibe, setSelectedVibe] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const submitVibe = async (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/myVibe/",
        {
          mood: selectedVibe,
          journal: journalEntry,
          date: new Date(),
        },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"), // Include the CSRF token in the headers
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setShowSuccess(true);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // axios.get()
    setVibes(fakeVibes);
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <animated.div
      style={fadeIn}
      className="flex h-contentHeight flex-col overflow-y-auto gap-y-10 px-standard py-[2rem]"
    >
      <div>
        <h1>
          Hello, <span className="text-secondary font-bold">Karim</span>
        </h1>
        <h2>Let’s check in on your vibe.</h2>
      </div>

      <div className="flex h-full justify-between gap-x-20">
        <DailyVibe
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
          journalEntry={journalEntry}
          setJournalEntry={setJournalEntry}
          submitVibe={submitVibe}
          showSuccess={showSuccess}
        />
        {vibes && <VibeChart vibes={vibes} />}
      </div>
    </animated.div>
  );
};

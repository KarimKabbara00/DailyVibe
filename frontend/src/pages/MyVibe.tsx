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

const numToDescription: { [key: string]: number } = {
  Angry: 0,
  Frustrated: 1,
  Anxious: 2,
  Neutral: 3,
  Relaxed: 4,
  Content: 5,
  Happy: 6,
  "Very Happy": 7,
};

const countStreak = (vibes: Vibe[]): number => {
  if (vibes.length === 1) return 1;
  let streak = 1;
  for (let i = 0; i < vibes.length - 1; i++) {
    const d1 = new Date(vibes[i].date).getTime();
    const d2 = new Date(vibes[i + 1].date).getTime();
    if (d2 - d1 === 86400000) {
      streak++;
    } else {
      streak = 1;
    }
  }
  return streak;
};

export const MyVibe: React.FC = () => {
  const [vibes, setVibes] = useState<Vibe[]>();
  const [selectedVibe, setSelectedVibe] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [lastSubmitDate, setLastSubmitDate] = useState<string>("");

  // function that grabs chart data for user
  const updateChart = () => {
    axios
      .get("http://127.0.0.1:8000/api/data/get_all_vibes", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setVibes(data);
        setLastSubmitDate(data[data.length - 1]?.date);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on sign in, grab all the data points for the chart
  useEffect(() => {
    updateChart();
  }, []);

  // submit vibe handler
  const submitVibe = async (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/myVibe/",
        {
          mood: numToDescription[selectedVibe],
          journal: journalEntry,
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
        updateChart(); // after we submit, we must update the chart
      })
      .catch((err) => {});
  };

  // count streak
  const [timespan, setTimespan] = useState<number>(7); // default to last 7 days
  useEffect(() => {
    if (!vibes) return;
    setCurrentStreak(countStreak(vibes));
  }, [vibes]);

  // number of chart data points
  useEffect(() => {
    if (!vibes) return;
    // in case we have less data points than user selected chart span
    let correctedTimespan = vibes.length < timespan ? vibes.length : timespan;
    const newVibes = vibes.slice(
      vibes.length - correctedTimespan,
      vibes.length
    );
    if (JSON.stringify(newVibes) !== JSON.stringify(vibes)) setVibes(newVibes);
  }, [vibes, timespan]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <animated.div
      style={fadeIn}
      className="flex h-contentHeight flex-col overflow-y-auto xsScreen:gap-y-8 gap-y-10 px-standard xsScreen:px-[1.5rem] py-[2rem]"
    >
      <div className="xlScreen:self-center xlScreen:w-full">
        <div className="text-4xl xsScreen:text-3xl">
          Hello, <span className="text-secondary font-bold">Karim</span>
        </div>
        <h2>Let’s check in on your vibe.</h2>
      </div>

      <div className="xlScreen:flex-col xlScreen:gap-y-8 flex h-full justify-between gap-x-20">
        <DailyVibe
          selectedVibe={selectedVibe}
          setSelectedVibe={setSelectedVibe}
          journalEntry={journalEntry}
          setJournalEntry={setJournalEntry}
          submitVibe={submitVibe}
          currentStreak={currentStreak}
          showSuccess={showSuccess}
          lastSubmitDate={lastSubmitDate}
        />
        {vibes && (
          <VibeChart
            vibes={vibes}
            timespan={timespan}
            setTimespan={setTimespan}
          />
        )}
      </div>
    </animated.div>
  );
};

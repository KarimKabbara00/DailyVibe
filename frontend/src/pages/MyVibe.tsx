import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { VibeChart } from "sections/MyVibe/VibeChart";
import { DailyVibe } from "sections/MyVibe/DailyVibe";
import { fakeVibes } from "fakeData";
import { useSpring, animated, to } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  checkSameDay,
  countStreak,
  formatDate,
  numToDescription,
} from "helperFunctions";

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const MyVibe: React.FC = () => {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [shownVibes, setShownVibes] = useState<Vibe[]>([]);
  const [selectedVibe, setSelectedVibe] = useState<string>("");
  const [journalEntry, setJournalEntry] = useState<string>("");
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [submittedToday, setSubmittedToday] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  // function that grabs chart data for user
  const updateChart = () => {
    if (Cookies.get("accessToken") === "DEMO ACCESS TOKEN") return;
    axios
      .get(`${baseUrl}/api/data/get_all_vibes/`, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const allVibes = res.data.all_vibes;
        const username = res.data.username;
        setVibes(allVibes);
        setShownVibes(allVibes);
        setUsername(username);
        
        const dateString = allVibes[allVibes.length - 1]?.date.split("-");
        const today = formatDate(new Date());
        const isSameDay = checkSameDay(dateString, today);
        setSubmittedToday(isSameDay);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on sign in, grab all the data points for the chart
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      navigate("/signin");
      return;
    }
    Cookies.get("accessToken") === "DEMO ACCESS TOKEN"
      ? setVibes(fakeVibes)
      : void 0;
    updateChart();
  }, [navigate]);

  // submit vibe handler
  const submitVibe = async (event: React.FormEvent) => {
    event.preventDefault();

    if (submittedToday) {
      toast.error("Already submiited a vibe today! Come back tomorrow.");
      return;
    }

    axios
      .post(
        `${baseUrl}/api/data/submit_vibe/`,
        {
          mood: numToDescription[selectedVibe],
          journal: journalEntry,
        },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setSubmittedToday(true);
        updateChart(); // after we submit, we must update the chart
      })
      .catch((err) => {
        toast.error("Error submitting vibe 😢. Try again!");
      });
  };

  // count streak
  useEffect(() => {
    if (!vibes) return;
    setCurrentStreak(countStreak(vibes));
  }, [vibes]);

  // number of chart data points
  const [timespan, setTimespan] = useState<number>(7); // default to last 7 days
  useEffect(() => {
    if (!vibes) return;
    // in case we have less data points than user selected chart timespan
    let correctedTimespan = vibes.length < timespan ? vibes.length : timespan;
    const newVibes = vibes.slice(
      vibes.length - correctedTimespan,
      vibes.length
    );

    // only update vibes if they are different. Otherwise infinite rerender!
    if (JSON.stringify(newVibes) !== JSON.stringify(shownVibes))
      setShownVibes(newVibes);
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
          Hello, <span className="text-secondary font-bold">{username}</span>
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
          submittedToday={submittedToday}
        />
        {vibes && (
          <VibeChart
            vibes={shownVibes}
            timespan={timespan}
            setTimespan={setTimespan}
          />
        )}
      </div>
    </animated.div>
  );
};

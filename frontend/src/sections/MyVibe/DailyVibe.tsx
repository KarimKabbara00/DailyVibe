import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface Props {
  selectedVibe: string;
  setSelectedVibe: (vibe: string) => void;
  journalEntry: string;
  setJournalEntry: (vibe: string) => void;
  submitVibe: (e: React.FormEvent) => void;
  showSuccess: boolean;
}

interface descEmoji {
  [key: string]: string;
}

const descriptionToEmoji: descEmoji[] = [
  { key: "Very Happy", value: "😁" },
  { key: "Happy", value: "😄" },
  { key: "Content", value: "😃" },
  { key: "Relaxed", value: "😊" },
  { key: "Neutral", value: "😐" },
  { key: "Anxious", value: "😟" },
  { key: "Frustrated", value: "😤" },
  { key: "Angry", value: "😡" },
];

export const DailyVibe: React.FC<Props> = ({
  selectedVibe,
  setSelectedVibe,
  journalEntry,
  setJournalEntry,
  submitVibe,
  showSuccess,
}) => {
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const buttonHoverAnim = useSpring({
    backgroundColor: buttonHovered ? "#DBAB1E" : "#2F6690",
    color: buttonHovered ? "black" : "white",
    config: { duration: 75 },
  });

  return (
    <div className="w-[55%] h-full">
      <div className="flex flex-col gap-y-3">
        <h2 className="font-bold">Today, I feel...</h2>
        <form
          className="flex flex-col items-center gap-y-4 "
          onSubmit={submitVibe}
        >
          <select
            required
            className="rounded-standard border-2 border-primary p-0.5 pl-1 w-full focus:outline-none m-0 focus:border-secondary"
            value={selectedVibe}
            onChange={(e) => setSelectedVibe(e.target.value)}
          >
            <option value="">🤔 Select an option</option>
            {descriptionToEmoji.map((item: descEmoji, index) => (
              <option key={index} value={item.key}>
                {item.value} {item.key}
              </option>
            ))}
          </select>
          <textarea
            className="w-full border-2 border-primary focus:border-2 focus:outline-none focus:border-secondary p-1 rounded-standard mt-2 h-[20rem]"
            placeholder="Talk about your day... (optional)"
            onChange={(e) => setJournalEntry(e.target.value)}
            value={journalEntry}
          ></textarea>
          <div className="self-end justify-between w-full flex">
            <div className="text-xl">Your streak: 25 days🔥</div>

            <animated.button
              style={buttonHoverAnim}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              type="submit"
              className=" py-1 w-24 border-0"
            >
              Submit
            </animated.button>
          </div>
        </form>
        {showSuccess && <div>Success</div>}
      </div>
    </div>
  );
};

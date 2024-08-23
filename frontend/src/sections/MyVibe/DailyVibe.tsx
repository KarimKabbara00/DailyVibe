import React from "react";
import { Button } from "components/Misc/Button";
import Cookies from "js-cookie";

interface Props {
  selectedVibe: string;
  setSelectedVibe: (vibe: string) => void;
  journalEntry: string;
  setJournalEntry: (vibe: string) => void;
  submitVibe: (e: React.FormEvent) => void;
  currentStreak: number;
  submittedToday: boolean;
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

export const DailyVibe: React.FC<Props> = ({ selectedVibe, setSelectedVibe, journalEntry, setJournalEntry, submitVibe, currentStreak, submittedToday }) => {
  return (
    <div className="w-[55%] xlScreen:w-full h-full">
      <div className="flex flex-col gap-y-3">
        <h2 className="font-bold">Today, I feel...</h2>
        <form className="flex flex-col items-center gap-y-4 " onSubmit={submitVibe}>
          <select required className="rounded-standard border-2 border-primary p-0.5 pl-1 w-full focus:outline-none m-0 focus:border-secondary" value={selectedVibe} onChange={(e) => setSelectedVibe(e.target.value)}>
            <option value="">🤔 Select an option</option>
            {descriptionToEmoji.map((item: descEmoji, index) => (
              <option key={index} value={item.key}>
                {item.value} {item.key}
              </option>
            ))}
          </select>
          <textarea
            className="w-full border-2 border-primary focus:border-2 focus:outline-none focus:border-secondary p-1 rounded-standard mt-2 xlScreen:h-[15rem] h-[20rem]"
            placeholder="Talk about your day... (optional)"
            onChange={(e) => setJournalEntry(e.target.value)}
            value={journalEntry}
          ></textarea>
          <div className="self-end justify-between items-center w-full flex">
            <div className="smScreen:text-lg text-xl">
              Your streak: {currentStreak} {currentStreak === 1 ? "day" : "days"}
              {currentStreak > 0 ? "🔥" : ""}
            </div>
            <Button text="Submit" disabled={submittedToday || Cookies.get("accessToken") === "DEMO ACCESS TOKEN"} />
          </div>
        </form>
        {submittedToday && <div>Nice job logging today 👏. Come back again tomorrow!</div>}
        {Cookies.get("accessToken") === "DEMO ACCESS TOKEN" && <div>❗Please create an account to submit a vibe.</div>}
      </div>
    </div>
  );
};

import { useSpring, animated } from "@react-spring/web";
import React from "react";

const moodToDescription: { [key: number]: string } = {
  0: "Angry",
  1: "Frustrated",
  2: "Anxious",
  3: "Neutral",
  4: "Relaxed",
  5: "Content",
  6: "Happy",
  7: "Very Happy",
};

const moodToEmoji: { [key: number]: string } = {
  0: "😡", // Angry
  1: "😤", // Frustrated
  2: "😟", // Anxious
  3: "😐", // Neutral
  4: "😊", // Relaxed
  5: "😃", // Content
  6: "😄", // Happy
  7: "😁", // Very Happy
};

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

interface Props {
  vibe: Vibe;
}

export const VibeEntry: React.FC<Props> = ({ vibe }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 100 },
  });

  return (
    <>
      {vibe && (
        <animated.div style={fadeIn} className="flex flex-col gap-y-4 xsScreen:gap-y-6 pb-12">
          <h1 className="flex flex-wrap gap-x-2">
            <div>On {vibe.date},</div>
            <div>
              you felt <span className="text-secondary font-bold pr-1">{moodToDescription[vibe.mood]}</span>
              {moodToEmoji[vibe.mood]}
            </div>
          </h1>
          <div>
            <div className="border-b-2 text-2xl w-fit pb-0.5 border-primary boredr-primary">Journal Entry</div>
            <div className="pt-2 text-xl">{vibe.journal.length > 0 ? vibe.journal : "No journal entry."}</div>
          </div>
        </animated.div>
      )}
    </>
  );
};

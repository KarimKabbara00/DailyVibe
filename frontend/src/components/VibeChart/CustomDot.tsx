import React from "react";
import { useNavigate } from "react-router-dom";
import { DotProps } from "recharts";

const numToEmoji: { [key: number]: string } = {
  0: "😡", // Angry
  1: "😤", // Frustrated
  2: "😟", // Anxious
  3: "😐", // Neutral
  4: "😊", // Relaxed
  5: "😃", // Content
  6: "😄", // Happy
  7: "😁", // Very Happy
};

interface Props {
  value: number;
  dotData: any;
}

export const CustomDot: React.FC<DotProps & Props> = ({ dotData, ...props }) => {
  const navigate = useNavigate();
  const viewVibe = (data: any) => {
    // const { mood, journal, date } = data;
    navigate(`/vibe`, { state: { data: data } });
  };

  const { cx, cy, value } = props;
  return (
    <text className="cursor-pointer" onClick={() => viewVibe(dotData)} x={cx} y={cy} dy={5} textAnchor="middle" fontSize={16}>
      {numToEmoji[value]}
    </text>
  );
};

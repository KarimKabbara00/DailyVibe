import { CustomDot } from "components/VibeChart/CustomDot";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

interface Props {
  vibes: Vibe[];
}

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

const tooltipFormatter = (value: number) => {
  return moodToDescription[value];
};

export const VibeChart: React.FC<Props> = ({ vibes }) => {
  const propsWithoutKey = (props: any) => {
    const key = props["key"];
    delete props["key"];
    return <CustomDot key={key} dotData={props.payload} {...props} />;
  };

  return (
    <div className="flex flex-col w-7/12 gap-y-6">
      <div className="flex justify-between items-end px-6">
        <div>
          <h2 className="font-bold ">Vibe Trend</h2>
          <span className="italic">
            Click on an emoji to view your entry for that day.
          </span>
        </div>
        <div>
          <select className="rounded-standard border-2 border-primary p-0.5 pl-1.5 w-full focus:outline-none m-0 focus:border-secondary">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 365 Days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={730}
          data={vibes}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            tick={{ dy: 15 }}
            style={{ marginTop: "20rem", paddingTop: "20rem" }}
            dataKey="date"
          />
          <YAxis
            tick={{ dx: -15 }}
            fontSize={12}
            tickFormatter={(value) => moodToDescription[value]}
            domain={[0, 7]}
            ticks={[0, 1, 2, 3, 4, 5, 6, 7]}
          />
          {/* <Tooltip formatter={tooltipFormatter} /> */}
          <Line
            type="monotone"
            dataKey="mood"
            activeDot={false}
            stroke="#8884d8"
            dot={(props) => propsWithoutKey(props)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

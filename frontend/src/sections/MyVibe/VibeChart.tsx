import { CustomDot } from "components/VibeChart/CustomDot";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

interface Props {
  vibes: Vibe[];
  timespan: number;
  setTimespan: (t: number) => void;
}

const numToDescription: { [key: number]: string } = {
  0: "Angry",
  1: "Frustrated",
  2: "Anxious",
  3: "Neutral",
  4: "Relaxed",
  5: "Content",
  6: "Happy",
  7: "Very Happy",
};

export const VibeChart: React.FC<Props> = ({ vibes, timespan, setTimespan }) => {
  const propsWithoutKey = (props: any) => {
    const key = props["key"];
    delete props["key"];
    return <CustomDot key={key} dotData={props.payload} {...props} />;
  };

  return (
    <div className="flex flex-col xlScreen:w-full w-7/12 gap-y-6 pb-24">
      <div className="flex smScreen:flex-col smScreen:items-start smScreen:gap-y-2 justify-between items-end xlScreen:px-0 px-6">
        <div>
          <h2 className="font-bold">Vibe Trend</h2>
          <span className="italic xsScreen:text-sm">Click on an emoji to view your entry for that day.</span>
        </div>
        <div>
          <select value={timespan} onChange={(e) => setTimespan(parseInt(e.target.value))} className="rounded-standard border-2 border-primary p-0.5 pl-1.5 w-full focus:outline-none m-0 focus:border-secondary">
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={365}>Last 365 Days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={730} data={vibes} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{ dy: 15 }} style={{ marginTop: "20rem", paddingTop: "20rem" }} dataKey="date" />
          <YAxis tick={{ dx: -15 }} fontSize={12} tickFormatter={(value) => numToDescription[value]} domain={[0, 7]} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} />
          <Line type="monotone" dataKey="mood" activeDot={false} stroke="#8884d8" dot={(props) => propsWithoutKey(props)} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

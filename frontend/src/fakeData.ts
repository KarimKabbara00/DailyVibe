const moodToDescription: { [key: string]: number } = {
  Angry: 0,
  Frustrated: 1,
  Anxious: 2,
  Neutral: 3,
  Relaxed: 4,
  Content: 5,
  Happy: 6,
  "Very Happy": 7,
};

const formatDate = (date: Date) => {
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
  return `${month}/${day}/${year}`;
};

interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

// Transform the original data
export const fakeVibes: Vibe[] = [
  {
    user_id: 1234,
    mood: moodToDescription["Angry"],
    journal: "",
    date: formatDate(new Date("2024-08-18T10:00:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Frustrated"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-19T14:30:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Anxious"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-20T09:15:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Neutral"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-21T12:45:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Relaxed"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-22T16:00:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Relaxed"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-23T18:20:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Happy"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-24T08:00:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Content"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-25T10:10:00Z")),
  },
  {
    user_id: 1234,
    mood: moodToDescription["Very Happy"],
    journal:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    date: formatDate(new Date("2024-08-26T13:30:00Z")),
  },
];

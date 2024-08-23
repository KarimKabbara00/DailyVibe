interface Vibe {
  user_id: number;
  mood: number;
  journal: string;
  date: string;
}

export const numToDescription: { [key: string]: number } = {
  Angry: 0,
  Frustrated: 1,
  Anxious: 2,
  Neutral: 3,
  Relaxed: 4,
  Content: 5,
  Happy: 6,
  "Very Happy": 7,
};

export const countStreak = (vibes: Vibe[]): number => {
  if (vibes.length < 2) return vibes.length;
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

export const checkSameDay = (
  dateString: string[],
  today: string[]
): boolean => {
  if (!dateString) return false;
  let sameDay =
    parseInt(dateString[0]) === parseInt(today[0]) &&
    parseInt(dateString[1]) === parseInt(today[1]) &&
    parseInt(dateString[2]) === parseInt(today[2]);
  return sameDay;
};

export const formatDate = (date: Date): string[] => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  return `${month}-${day}-${year}`.split("-");
};

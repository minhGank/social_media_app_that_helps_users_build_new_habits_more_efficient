import { useState } from "react";
import CreatePostPopUp from "../../components/CreatePostPopUp";
import { useSelector } from "react-redux";
export default function HabitFullDisplay({ visitorn, habit }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [showPostPopUp, setShowPostPopUp] = useState();
  const dayClick = (day) => {
    setShowPostPopUp(day);
  };
  const allDays = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  return (
    <div className="habit_full_display">
      <div className="habit_full_display_top">
        {allDays.map((day, i) => (
          <div
            className="habit_display_day circle_icon"
            key={i}
            onClick={() => dayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
      {showPostPopUp && (
        <CreatePostPopUp
          user={user}
          setVisable={setShowPostPopUp}
          day={showPostPopUp}
          habit={habit}
        />
      )}
      <div className="habit_full_display_bottom"></div>
    </div>
  );
}

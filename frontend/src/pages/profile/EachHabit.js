import { useState } from "react";
import { ArrowDown, Dots } from "../../svg";
import HabitFullDisplay from "./HabitFullDisplay";

export default function EachHabit({ habit, i, visitor, posts }) {
  const [showEachHabit, setShowEachHabit] = useState("");
  console.log(showEachHabit);
  const habitToggle = (index) => {
    setShowEachHabit((prev) => {
      return prev == index ? "" : index;
    });
  };
  console.log(habit);
  return (
    <div className="habit_profile_display">
      <div className="habit_half_display">
        <div className="habit_profile_display_left">
          <span>{habit.name}</span>
          <span> {habit.status}</span>
        </div>

        <div className="habit_profile_display_right">
          <div className="post_header_right hover1">
            <Dots color="#828387 " />
          </div>
          <div
            className="circle_icon hover1"
            onClick={() => {
              habitToggle(i + 1);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>
        </div>
      </div>
      {showEachHabit == i + 1 ? (
        <HabitFullDisplay posts={posts} visitor={visitor} habit={habit} />
      ) : (
        ""
      )}
    </div>
  );
}

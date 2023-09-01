import { useState } from "react";
import { ArrowDown, ArrowDown1 } from "../../svg";
import EachHabit from "./EachHabit";

export default function ProfileHabit({ habits, visitor, posts }) {
  return (
    <div className="habit_profile_div">
      <div className="habit_top_div">
        <span>Habits:</span>
      </div>
      <div className="habit_bottom_div">
        {habits?.map((habit, i) => (
          <EachHabit
            habit={habit}
            posts={posts}
            visitor={visitor}
            key={i}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

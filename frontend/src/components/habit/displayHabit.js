import axios from "axios";
import "./style.css";
import { addHabit } from "../../functions/habit";
export default function DisplayHabit({ habit, i, user }) {
  return (
    <div className="display_habit_div">
      <div className="display_habit_all">
        <div className="display_habit_intro">
          {i + 1}. {habit.name}
        </div>
        <div className="display_habit_bottom">{habit.description}</div>
      </div>
      <div
        className="circle_icon hover1"
        onClick={() => {
          addHabit(habit.name, habit.description, habit._id, user.token);
          console.log(habit.name, habit.description, habit._id, user.token);
        }}
      >
        <img
          src="../../../self-icon/plus.png"
          className="filter_white add_habit_icon"
        />
      </div>
    </div>
  );
}

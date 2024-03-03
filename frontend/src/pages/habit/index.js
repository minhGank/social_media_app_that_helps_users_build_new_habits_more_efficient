import { useEffect, useReducer, useState } from "react";
import "./style.css";
import LeftHome from "../../components/home/left";
import Header from "../../components/header";
import axios from "axios";
import { habitReducer } from "../../functions/reducer";
import { useSelector } from "react-redux";
import DisplayHabit from "../../components/habit/displayHabit";
export default function Habit() {
  const { user } = useSelector((state) => ({ ...state }));
  const [trueIsAllHabit, FalseIsYourHabits] = useState(true);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [{ loading, habits, error }, dispatch] = useReducer(habitReducer, {
    loading: false,
    habits: [],
    error: "",
  });

  useEffect(() => {
    getAllHabit();
  }, []);

  const getAllHabit = async () => {
    try {
      dispatch({
        type: "HABIT_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllHabits`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "HABIT_SUCCESS",
        payload: data,
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: "HABIT_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="habit_page">
      <Header />
      <div className="habit_page_parts">
        <LeftHome user={user} />
        <div className="habit_page_right">
          <div className="habit_page_top">
            <button className={trueIsAllHabit ? "blue_btn" : "gray_btn"}>
              All Habits
            </button>
            <button
              onClick={() => {
                setShowAddCustom(true);
              }}
              className={trueIsAllHabit ? "gray_btn" : "blue_btn"}
            >
              Add Custom Habit
            </button>
          </div>
          {trueIsAllHabit && (
            <div className="all_habits_parts">
              {habits &&
                habits.map((habit, i) => (
                  <DisplayHabit habit={habit} user={user} key={i} i={i} />
                ))}
            </div>
          )}
        </div>
      </div>
      {showAddCustom && (
        <div className="div_for_customize_habit">
          <div className="div_for_customize_habit_tab">
            <div className="div_for_customize_habit_headline">
              <h3>Add Custome Habit</h3>
            </div>
            <div
              className="small_circle exitHabitTab"
              onClick={() => {
                setShowAddCustom(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div className="div_for_customize_habit_inputs">
              <form method="POST">
                <label for="nameOfHabit">Name:</label>
                <br></br>
                <input
                  type="text"
                  name="nameOfHabit"
                  placeholder="Habit name..."
                />
                <br></br>
                <label for="descriptionOfHabit">Description:</label>
                <br></br>
                <textarea
                  type="text"
                  name="descriptionOfHabit"
                  placeholder="Description..."
                />
                <br></br>
                <button type="submit">Complete</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

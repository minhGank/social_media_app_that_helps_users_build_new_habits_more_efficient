import CreatePostPopUp from "../../CreatePostPopUp";
import { useEffect, useState } from "react";
import PostPopup from "../../post/PostPopup";
import { useSelector } from "react-redux";
import axios from "axios";

export default function EachHabitInOverview({ i, habit, posts }) {
  console.log(habit);
  const { user } = useSelector((state) => ({ ...state }));
  const [postEachDay, setPostEachDay] = useState("");
  const [showPostPopUp, setShowPostPopUp] = useState();
  const [showingDay, setShowingDay] = useState([]);

  //those functions below will take which day user pick, and paste it into the function to show the post popup or the create post
  const dayClick = (day) => {
    setShowPostPopUp(day);
  };
  const showEachDay = (post) => {
    setPostEachDay(post);
  };

  //those function below will be for creating and display the day start in the react
  // const dateStart = new Date(habit.dayStart);
  // // const dateStartDisplay =
  // //   dateStart.getDate().toString() +
  // //   "/" +
  // //   (dateStart.getMonth() + 1).toString() +
  // //   "/" +
  // //   dateStart.getFullYear().toString();

  //those function below will be the algorithm for distinguish which day user forgot and which day user remember to do the habit
  const dayStart = new Date(habit.dayStart).setHours(0, 0, 0, 0);
  const currentDayFromDayStart = new Date().setHours(0, 0, 0, 0);
  const currentDay = (currentDayFromDayStart - dayStart) / (1000 * 3600 * 24);
  console.log("this is current Day", currentDay);

  //object.keys will turn all the keys inside habit object into an array, each element of this array will be each key of the object habit, from that, use map() with the parameter of index of each key, create another array, each element of the array will be an object. Each object will include the key: the index of each key in the first array, the value of each property will be the according property that has the same index in habit object

  //those function below will used for calculating the completion rate of userhabit
  const allDetails = Object.keys(habit).map((key) => ({
    [key]: habit[key],
  }));
  const valueInsideEachDayBeingAnArray = allDetails
    .slice(0, 30)
    .map((day, i) => {
      return day[i + 1];
    });
  // console.log("this is valueInsideEachDay", valueInsideEachDayBeingAnArray);
  let completedDay = 0;
  for (let i = 0; i < currentDay; i++) {
    if (valueInsideEachDayBeingAnArray[i] != null) {
      // console.log(valueInsideEachDayBeingAnArray[i]);
      completedDay = completedDay + 1;
    }
  }
  // console.log("this is complete day", completedDay);
  const completionRate = Math.round((completedDay / currentDay) * 100);

  //those function below will used for calculating the streak of userhabit
  let streak = 0;
  for (let i = currentDay; i >= 0; i--) {
    if (valueInsideEachDayBeingAnArray[i] != null) {
      streak = streak + 1;
    } else {
      break;
    }
  }

  console.log("this is streak", streak);

  // these function below will determine that day we will show in the tab
  //instead of showing the whole 30 days, we will only show 10 days that we're currently in

  const showingCurrentDay = Math.floor((currentDay - 1) / 10);

  useEffect(() => {
    setShowingDay([showingCurrentDay * 10, showingCurrentDay * 10 + 10]);
  }, [showingCurrentDay]);
  console.log("this is showingDay", showingDay);

  return (
    <div className="EachHabitInOverview_div">
      <div className="EachHabitInOverview_div_intro">
        <div className="EachHabitInOverview_div_intro_name">
          <p>
            {i + 1}. {habit.name}
          </p>
        </div>

        <div className="EachHabitInOverview_div_intro_infomation">
          <span className="">Streak: {streak}</span>{" "}
          <span className="">Completion Rate: {completionRate}% </span>
          <span className="">Status: {habit.status} </span>
          {/* <span className="">Day Start: {dateStartDisplay} </span> */}
        </div>
      </div>
      <div className="habit_full_display_in_tab_overview">
        {allDetails.slice(showingDay[0], showingDay[1]).map((day, i) => {
          {
            /* console.log("this is alldetails", allDetails); */
          }
          //the day paramater wil be an object that the key inside it will be the day of the post and the value will be the value of the post.
          const eachDay = Object.keys(day)[0];
          {
            /* console.log("this is each Day", eachDay);
          console.log("this is day", day); */
          }
          //the eachDay variable will take out the day (which is the key of each day parameter)
          //eachDay variable will be a number represent a day
          const valueInsideEachDay = day[eachDay];
          //valueInsideEachDay will be the ObecjId of the post
          //the purpose of 2 lines above are to take out the value/Post ObjectId of each day/post
          {
            /* console.log("this is valueInsideEachDay", valueInsideEachDay); */
          }
          return (
            <div
              //below added 2 customed css, 1 for style the forgot day & rememberday, 1 style for the current day
              className={`habit_display_day_in_home circle_icon ${
                valueInsideEachDay == null && eachDay <= currentDay
                  ? "forgot_day"
                  : valueInsideEachDay != null
                  ? "green_day"
                  : ""
              } ${eachDay == currentDay ? "current_day" : ""} ${
                eachDay > currentDay ? "day_future" : ""
              }`}
              key={i}
              onClick={() => {
                //check to ony allow user to choose the next day to upload the post
                //check to only allow user to post once a day
                if (eachDay <= currentDay) {
                  valueInsideEachDay == null && eachDay == currentDay
                    ? dayClick(i + 1)
                    : showEachDay(
                        posts.find((post) => post._id == valueInsideEachDay)
                      );
                }
              }}
            >
              {eachDay}
            </div>
          );
        })}
      </div>
      <div className="habitTabSeperateLine">
        <hr></hr>
      </div>
      {postEachDay && (
        <PostPopup
          setPostEachDay={setPostEachDay}
          post={postEachDay}
          user={user}
        />
      )}
      {showPostPopUp && (
        <CreatePostPopUp
          user={user}
          setVisable={setShowPostPopUp}
          day={showPostPopUp}
          habit={habit}
        />
      )}
    </div>
  );
}

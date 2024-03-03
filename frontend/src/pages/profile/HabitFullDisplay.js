import { useEffect, useState } from "react";
import CreatePostPopUp from "../../components/CreatePostPopUp";
import { useSelector } from "react-redux";
import PostPopup from "../../components/post/PostPopup";
export default function HabitFullDisplay({ visitor, habit, posts }) {
  console.log("this is habit variable", habit);
  const { user } = useSelector((state) => ({ ...state }));
  const [postEachDay, setPostEachDay] = useState("");
  const [showPostPopUp, setShowPostPopUp] = useState();

  //function below will reload the page
  // const [reloadPage, setReloadPage] = useState(false);
  // useEffect(() => {
  //   if (reloadPage) {
  //     window.location.reload();
  //     setReloadPage(false);
  //   }
  // });

  //those function below will be the algorithm for distinguish which day user forgot and which day user remember to do the habti
  const dayStart = new Date(habit.dayStart).setHours(0, 0, 0, 0);
  const currentDayFromDayStart = new Date().setHours(0, 0, 0, 0);
  const currentDay = (currentDayFromDayStart - dayStart) / (1000 * 3600 * 24);
  console.log(currentDay);

  //those functions below will take which day user pick, and paste it into the function to show the post popup or the create post
  const dayClick = (day) => {
    setShowPostPopUp(day);
  };
  const showEachDay = (post) => {
    setPostEachDay(post);
  };

  console.log(postEachDay);

  //object.keys will turn all the keys inside habit object into an array, each element of this array will be each key of the object habit, from that, use map() with the parameter of index of each key, create another array, each element of the array will be an object. Each object will include the key: the index of each key in the first array, the value of each property will be the according property that has the same index in habit object
  const allDetails = Object.keys(habit).map((key) => ({
    [key]: habit[key],
  }));
  console.log(allDetails);

  return (
    <div className="habit_full_display">
      <div className="habit_full_display_top">
        {allDetails.slice(0, 30).map((day, i) => {
          //the day paramater wil be an object that the key inside it will be the day of the post and the value will be the value of the post.
          const eachDay = Object.keys(day)[0];
          //the eachDay variable will take out the day (which is the key of each day parameter)
          //eachDay variable will be a number represent a day
          const valueInsideEachDay = day[eachDay];
          //valueInsideEachDay will be the ObecjId of the post
          //the purpose of 2 lines above are to take out the value/Post ObjectId of each day/post

          return (
            <div
              //below added 2 customed css, 1 for style the forgot day & rememberday, 1 style for the current day
              className={`habit_display_day circle_icon ${
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
              {i + 1}
            </div>
          );
        })}
      </div>
      {postEachDay && (
        <PostPopup
          setPostEachDay={setPostEachDay}
          post={postEachDay}
          user={user}
        />
      )}
      {showPostPopUp && !visitor && (
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

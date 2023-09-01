import { useState } from "react";
import CreatePostPopUp from "../../components/CreatePostPopUp";
import { useSelector } from "react-redux";
import Post from "../../components/post";
import PostPopup from "../../components/post/PostPopup";
export default function HabitFullDisplay({ visitor, habit, posts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [postEachDay, setPostEachDay] = useState("");
  const [showPostPopUp, setShowPostPopUp] = useState();
  const dayClick = (day) => {
    setShowPostPopUp(day);
  };
  const showEachDay = (post) => {
    setPostEachDay(post);
  };

  console.log(postEachDay);

  const allDetails = Object.keys(habit).map((key) => ({
    [key]: habit[key],
  }));

  return (
    <div className="habit_full_display">
      <div className="habit_full_display_top">
        {allDetails.slice(0, 30).map((day, i) => {
          const eachDay = Object.keys(day)[0];
          const valueInsideEachDay = day[eachDay];
          console.log(valueInsideEachDay);
          return (
            <div
              className="habit_display_day circle_icon"
              key={i}
              onClick={() =>
                valueInsideEachDay == null
                  ? dayClick(i + 1)
                  : showEachDay(
                      posts.find((post) => post._id == valueInsideEachDay)
                    )
              }
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

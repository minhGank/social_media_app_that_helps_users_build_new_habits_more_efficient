import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import Post from "../../components/post";
import { useEffect, useRef, useState } from "react";
import { getUserHabit } from "../../functions/habit";
import EachHabitInOverview from "../../components/home/right/eachHabitInOverview";

export default function Home({ setVisable, posts, loading }) {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  const [userHabit, setUserHabit] = useState([]);
  const middle = useRef(null);
  const [height, setHeight] = useState("");
  useEffect(() => {
    setHeight(middle.current.clientHeight);
    fetchUserHabit();
  }, [loading, height]);

  // useEffect(() => {
  //   fetchUserHabit();
  // });

  const fetchUserHabit = async () => {
    try {
      const userHabitData = await getUserHabit(user.token);
      console.log(userHabitData);
      setUserHabit(userHabitData);
    } catch (error) {
      console.log("fetchUserHabit", error);
    }
  };

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {/* <CreatePost setVisable={setVisable} user={user} /> */}
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <div className="right_home">
        <div className="habit_overview">
          {userHabit?.userHabit?.habit?.map((habit, i) => (
            <EachHabitInOverview habit={habit} i={i} posts={userHabit.posts} />
          ))}
        </div>
      </div>
    </div>
  );
}

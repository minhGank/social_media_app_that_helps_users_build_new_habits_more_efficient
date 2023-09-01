import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import Post from "../../components/post";
import { useEffect, useRef, useState } from "react";

export default function Home({ setVisable, posts, loading }) {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState("");
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);

  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        {/* <Stories /> */}
        {/* <CreatePost setVisable={setVisable} user={user} /> */}
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      {/* <RightHome user={user} /> */}
    </div>
  );
}

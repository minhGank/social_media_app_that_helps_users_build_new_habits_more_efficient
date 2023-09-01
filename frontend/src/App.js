import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedinRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import CreatePostPopup from "./components/CreatePostPopUp";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postReducer } from "./functions/reducer";
import Habit from "./pages/habit";

//create reducer for useReducer

function App() {
  const [visible, setVisable] = useState(false);

  //destruct user object with the value of user in the redux state
  const { user } = useSelector((state) => ({ ...state }));

  //set initial state and usereducer
  const [{ loading, error, posts }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  //everytime the APP.js render, this function will be called to get all the post data, read more in the getAllPosts action below
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      //first, create an action which is the posts_request, in this action, ask for the data of every profile of users and posts in the backend, backend will send back data of every profile
      //in the array that back end send back, it will contain the firstname,lastname,username,email,gender, etc,...
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      //second, after backend finish sending the data of every post, set the action to request_succes and put that data in payload
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POST_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  //-------START RETURN------------
  return (
    <div>
      {visible && <CreatePostPopup setVisable={setVisable} user={user} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={<Profile setVisable={setVisable} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisable={setVisable} />}
            exact
          />
          <Route path="/habits" element={<Habit />} exact />
          <Route
            path="/"
            element={
              <Home loading={loading} setVisable={setVisable} posts={posts} />
            }
            exact
          />
          {/* <Route path="/activate/:token" element={<Activate />} exact /> */}
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

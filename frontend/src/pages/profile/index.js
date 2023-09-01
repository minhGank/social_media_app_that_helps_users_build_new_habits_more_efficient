import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducer";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import Header from "../../components/header";
import "./style.css";
import { useState } from "react";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PpleYouMayKnow from "./PpleYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPost from "./GridPost";
import Post from "../../components/post";
import Photos from "./Photo";
import Friends from "./Friends";
import Intro from "../../components/intro";
import Followers from "./Followers";
import Following from "./Following";
import LeftHome from "../../components/home/left";
import ProfileHabit from "./ProfileHabit";

export default function Profile({ setVisable }) {
  const { username } = useParams();
  const [photos, setPhotos] = useState({});
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [showBio, setShowBio] = useState(false);
  // function below will help in the case if there's is no params after /profile/, automatically make that params to be our username
  var userName = username === undefined ? user.username : username;
  // userName will have 2 options: the username of the owner's username or the username of the other users

  //if userName is the one of the owner(visiting), visitor variable will be false, but if its' not the owner who own the profile, visitor will be true
  var visitor = userName === user.username ? false : true;

  //the path, max, sort for the function of getting all the photos
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  //useReducer of getting profile information
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  const getProfile = async () => {
    try {
      //first, create an action which is the profile_request, in this action, ask for the data of every post in the backend, backend will send back data of every single post in one array
      //in the array that back end send back, it will contain the id, type, text, images, user,...
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      //second, after backend finish sending the data of every post, set the action to request_succes and put that data in payload
      //the data in the payload will then pass to variable profile (go to function/reducer/getProfile for more details)
      //if there's an error (mainly because of typing the wrong user name, it will directly send to our own profile page)
      if (data.ok === false) {
        navigate(`/profile`);
      } else {
        //------start getting all images function-----
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        //------end of getting all images function-----

        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [userName]);

  console.log(profile);
  return (
    <div className="profile">
      {/* ----------first div is the div for Header ---------*/}
      <Header page="profile" />
      <div className="profile-parts">
        <div className="profile_header_left">
          <LeftHome user={user} />
        </div>
        <div className="profile_top">
          <div className="profile_container">
            <ProfilePictureInfos
              userName={userName}
              photos={photos.resources}
              profile={profile}
              visitor={visitor}
              detailss={profile.details}
              showBio={showBio}
              setShowBio={setShowBio}
            />
          </div>

          <div className="intro-follower-following-div">
            <div className="intro-div">
              <Intro
                showBio={showBio}
                setShowBio={setShowBio}
                detailss={profile.details}
                visitor={visitor}
                profile={profile}
              />
            </div>

            <div className="follower-following-div">
              <Followers followers={profile.followers} />
              <Following following={profile.following} />
              <div className="habit-complete-intro-div ffd-item">
                Habit Completed
              </div>
            </div>
          </div>
          <ProfileHabit habits={profile.habit} visitor={visitor} />
        </div>
      </div>
    </div>
  );
}

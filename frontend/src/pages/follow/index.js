import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import "./style.css";
import { ChevronRight } from "react-feather";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function FollowPage() {
  const { user } = useSelector((state) => ({ ...state }));
  const [followMenu, setFollowMenu] = useState(1);
  const [peopleYouMayKnowState, setPeopleYouMayKnowState] = useState([]);
  const [yourFollowerState, setYourFollowerState] = useState([]);
  const [yourFollowingState, setYourFollowingState] = useState([]);
  const getPeopleYouMayKnow = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/peopleYouMayKnow`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setPeopleYouMayKnowState(data);
  };
  const getYourFollower = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/yourFollower`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setYourFollowerState(data);
    } catch (error) {
      console.error("Error fetching your follower data:", error);
    }
  };
  const getYourFollowing = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/yourFollowing`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setYourFollowingState(data);
    } catch (error) {
      console.error("Error fetching your follower data:", error);
    }
  };

  useEffect(() => {
    getPeopleYouMayKnow();
    getYourFollower();
    getYourFollowing();
  }, []);

  return (
    <div className="follow_page_div">
      <Header />
      <div className="follow_page_parts">
        <LeftHome user={user} />
        <div className="follow_page_main">
          <div className="follow_menu">
            <div className="follow_menu_item_top">Menu</div>
            <div
              className="follow_menu_item hover1"
              onClick={() => {
                setFollowMenu(1);
              }}
            >
              <span>People you may know</span> <ChevronRight />
            </div>
            <div
              className="follow_menu_item hover1"
              onClick={() => {
                setFollowMenu(2);
              }}
            >
              <span>Your followers</span> <ChevronRight />
            </div>
            <div
              className="follow_menu_item hover1"
              onClick={() => {
                setFollowMenu(3);
              }}
            >
              <span>Your following</span> <ChevronRight />
            </div>
          </div>
          <div className="follow_info">
            {followMenu == 1 && (
              <div className="people_you_may_know_div">
                {peopleYouMayKnowState?.map((user, i) => (
                  <div className="people_you_may_know_each_user">
                    <div className="people_you_may_know_user_intro">
                      <img src={user?.picture} />
                      <div className="people_you_may_know_user_intro_info">
                        <span>{user?.username}</span>
                        <span>
                          {user?.first_name} {user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="blue_btn">Follow</div>
                  </div>
                ))}
              </div>
            )}
            {followMenu == 2 && (
              <div className="people_you_may_know_div">
                {yourFollowerState?.map((user, i) => (
                  <div className="people_you_may_know_each_user">
                    <div className="people_you_may_know_user_intro">
                      <img src={user?.picture} />
                      <div className="people_you_may_know_user_intro_info">
                        <span>{user?.username}</span>
                        <span>
                          {user?.first_name} {user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="blue_btn">Follow</div>
                  </div>
                ))}
              </div>
            )}
            {followMenu == 3 && (
              <div className="people_you_may_know_div">
                {yourFollowingState?.map((user, i) => (
                  <div className="people_you_may_know_each_user">
                    <div className="people_you_may_know_user_intro">
                      <img src={user?.picture} />
                      <div className="people_you_may_know_user_intro_info">
                        <span>{user?.username}</span>
                        <span>
                          {user?.first_name} {user?.last_name}
                        </span>
                      </div>
                    </div>
                    <div className="blue_btn">Follow</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import "./style.css";
import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { comment, getReactsfronend, reactPost } from "../../functions/react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Icon } from "@iconify/react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function PostPopup({ post, user, profile, setPostEachDay }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);
  console.log(post);

  useEffect(() => {
    getPostReacts();
  }, [post]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReactsfronend(post?._id, user?.token);
    setReacts(res.reacts);
    setTotal(res.reacts?.length);
    if (res.check) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const reactHandler = async (type) => {
    reactPost(post._id, type, user.token);
  };

  return (
    <div className="post_pop_up_div">
      <div className="post_pop_up_addtion"></div>

      <div className="post_pop_up_main">
        <div className="post_pop_up_images">
          {post.images && post.images?.length && (
            <div className="post_carousel">
              {post.images.map((image) => (
                <div className="image_in_carousel">
                  <img src={image.url} />
                  {post.images?.length > 1 && (
                    <div className="carousel_icon">
                      <button
                        style={{
                          borderRadius: "50%",
                          borderStyle: "none",
                          height: "30px",
                          width: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: "0.6",
                          cursor: "pointer",
                        }}
                      >
                        <ChevronLeft size={25} />
                      </button>
                      <button
                        style={{
                          borderRadius: "50%",
                          borderStyle: "none",
                          height: "30px",
                          width: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: "0.6",
                          cursor: "pointer",
                        }}
                      >
                        <ChevronRight size={25} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ------------------------------------------------------------------------- */}
        <div className="post_pop_up_info">
          <Link
            to={`/profile/${post.user?.username}`}
            className="post_header_left"
          >
            <img src={post.user?.picture} />

            <div className="header_col">
              <div className="post_profile_name">
                {post.user?.first_name} {post.user?.last_name}
                <div className="updated_p">
                  on <span>Day {post.day}</span> of{" "}
                  {post.user?.gender == "male"
                    ? "his"
                    : post.user?.gender == "female"
                    ? "her"
                    : "their"}{" "}
                  journey of building <span>{post.habit?.name}</span> habit
                </div>
                <div
                  className="small_circle_post_pop_up"
                  onClick={() => {
                    setPostEachDay("");
                  }}
                >
                  <i className="exit_icon"></i>
                </div>
              </div>

              <div className="post_profile_privacy_data">
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
                <Public color="#828387 " />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

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

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getPostReacts();
  }, [post]);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReactsfronend(post._id, user.token);
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
  console.log(post);
  return (
    <div className="post" style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
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
            </div>

            <div className="post_profile_privacy_data">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              <Public color="#828387 " />
            </div>
          </div>
        </Link>

        <div
          className="post_header_right hover1"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <Dots color="#828387 " />
        </div>
      </div>
      {/* the div below will appear if there in a background in the post */}
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images?.length && (
            <div
              className={
                post.images?.length === 1
                  ? "grid_1"
                  : post.images?.length === 2
                  ? "grid_2"
                  : post.images?.length === 3
                  ? "grid_3"
                  : post.images?.length === 4
                  ? "grid_4"
                  : post.images?.length >= 5 && "grid_5"
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} className={`img-${i}`} />
              ))}

              {post.images?.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images?.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user?.cover} />
          </div>

          <img src={post.images[0].url} className="post_updated_picture" />
        </div>
      ) : (
        <div className="post_cover_wrap"></div>
      )}

      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_num">
            {total}
            {total == 1 ? " like" : " likes"}
          </div>
        </div>
        <div className="to_right">
          <div className="comments_counts">
            {comments?.length == 0 ? "" : comments?.length}{" "}
            {comments?.length == 0
              ? ""
              : comments?.length == 1
              ? "comment"
              : "comments"}
          </div>
          <div className="share_count">1 share</div>
        </div>
      </div>

      <div className="post_actions">
        <div
          className="post_action hover1"
          onClick={() => {
            reactHandler("like");
            setCheck(!check);
            if (check == true) {
              setTotal(total - 1);
            } else {
              setTotal(total + 1);
            }
          }}
        >
          {check ? (
            <img src={`../../../reacts/heart.png`} style={{ width: "20px" }} />
          ) : (
            <img src={`../../../reacts/like.png`} style={{ width: "19px" }} />
          )}
          {check ? (
            <span style={{ color: "red", fontWeight: "600" }}>Like</span>
          ) : (
            <span>Like</span>
          )}
        </div>

        <div className="post_action hover1">
          <img
            src="../../../reacts/chat.png"
            style={{ width: "24px", marginLeft: "-1px" }}
          />
          <span>Comment</span>
        </div>

        <div className="post_action hover1">
          <img
            src="../../../reacts/send.png"
            style={{ width: "18px", marginTop: "1px" }}
          />
          <span>Send</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComment
          user={user}
          postId={post._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments?.length && (
          <div
            className="view_comments"
            onClick={() => setCount((prev) => prev + 3)}
          >
            View more
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user?._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
}

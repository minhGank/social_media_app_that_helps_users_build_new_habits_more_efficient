import { useState } from "react";
import { Link } from "react-router-dom";

export default function Following({ following }) {
  const [showFollowing, setShowFollowing] = useState(false);
  return (
    <div
      className={
        following?.length === 0 ? "ffd-item" : "followers-div ffd-item"
      }
    >
      <span
        onClick={() => {
          setShowFollowing(true);
        }}
      >
        Following
      </span>
      {following && (
        <div
          className="profile_card_count"
          onClick={() => {
            setShowFollowing(true);
          }}
        >
          {following.length === 0
            ? "0"
            : following.length === 1
            ? "1"
            : `${following.length}`}
        </div>
      )}
      {showFollowing && following.length !== 0 && (
        <div className="show-followers blur">
          <div className="box_header">
            <div
              className="small_circle"
              onClick={() => setShowFollowing(false)}
            >
              <i
                className="exit_icon"
                onClick={() => setShowFollowing(false)}
              ></i>
            </div>
            <span>Following</span>
          </div>
          <div className="show-followers-bottom">
            {following &&
              following.map((followings) => (
                <Link
                  to={`/profile/${followings.username}`}
                  className="follower-show"
                  onClick={() => {
                    showFollowing(false);
                  }}
                >
                  <div className="follower-show-img">
                    <img src={followings.picture} />
                  </div>

                  <div className="follower-show-info">
                    <span>
                      {followings.first_name} {followings.last_name}
                    </span>

                    <span>{followings.username}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

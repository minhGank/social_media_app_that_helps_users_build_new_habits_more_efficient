import { useState } from "react";
import { Link } from "react-router-dom";

export default function Followers({ followers }) {
  const [showFollowers, setShowFollowers] = useState(false);
  return (
    <div
      className={
        followers?.length === 0 ? "ffd-item" : "followers-div ffd-item"
      }
    >
      <span
        onClick={() => {
          setShowFollowers(true);
        }}
      >
        Followers
      </span>
      {followers && (
        <div
          className="profile_card_count"
          onClick={() => {
            setShowFollowers(true);
          }}
        >
          {followers.length === 0
            ? "0"
            : followers.length === 1
            ? "1"
            : `${followers.length}`}
        </div>
      )}
      {showFollowers && followers.length !== 0 && (
        <div className="show-followers blur">
          <div className="box_header">
            <div
              className="small_circle"
              onClick={() => setShowFollowers(false)}
            >
              <i
                className="exit_icon"
                onClick={() => setShowFollowers(false)}
              ></i>
            </div>
            <span>Followers</span>
          </div>
          {console.log(followers.le)}
          <div className="show-followers-bottom">
            {followers &&
              followers.map((follower) => (
                <Link
                  to={`/profile/${follower.username}`}
                  className="follower-show"
                  onClick={() => {
                    showFollowers(false);
                  }}
                >
                  <div className="follower-show-img">
                    <img src={follower.picture} />
                  </div>

                  <div className="follower-show-info">
                    <span>
                      {follower.first_name} {follower.last_name}
                    </span>

                    <span>{follower.username}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

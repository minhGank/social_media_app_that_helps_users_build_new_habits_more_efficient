import { Feeling, LiveVideo, Photo } from "../../svg";
import "./style.css";

export default function CreatePost({ setVisable, user, profile }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} />
        <div
          className="open_post hover2"
          onClick={() => {
            setVisable(true);
          }}
        >
          Show us your process, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live video
        </div>
        <div className="createPost_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        {profile ? (
          <div className="createPost_icon hover1">
            <i className="lifeEvent_icon"></i>
            Life Event
          </div>
        ) : (
          <div className="createPost_icon hover1">
            <Feeling color="#f7b928" />
            Feeling/Activity
          </div>
        )}
      </div>
    </div>
  );
}

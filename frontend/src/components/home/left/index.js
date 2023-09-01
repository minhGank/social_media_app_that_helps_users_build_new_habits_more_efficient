import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to="/habits" className="left_link hover1">
        <img src={`../../../self-icon/to-do-list.png`} />
        <span>Habits</span>
      </Link>

      <Link to="/follow" className="left_link hover1">
        <img src={`../../../self-icon/friends.png`} />
        <span>Follow</span>
      </Link>

      <div className="left_link hover1">
        <img src={`../../../self-icon/direction.png`} />
        <span>Explore</span>
      </div>

      <div className="left_link hover1">
        <img src={`../../../self-icon/chat.png`} />
        <span>Inbox</span>
      </div>

      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" className="left_link_profile" />
        <span>Profile</span>
      </Link>
    </div>
  );
}

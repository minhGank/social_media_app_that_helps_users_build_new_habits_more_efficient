import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import "./style.css";
import { ChevronRight } from "react-feather";
import { useState } from "react";
export default function FollowPage() {
  const { user } = useSelector((state) => ({ ...state }));
  const [followMenu, setFollowMenu] = useState(1);
  return (
    <div className="follow_page_div">
      <Header />
      <LeftHome user={user} />
      <div className="follow_page_main">
        <div className="follow_menu">
          <div className="follow_menu_item_top">Follow Menu</div>
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
          {followMenu == 1 && <div className=""></div>}
          {followMenu == 2 && <div className=""></div>}
          {followMenu == 3 && <div className=""></div>}
        </div>
      </div>
    </div>
  );
}

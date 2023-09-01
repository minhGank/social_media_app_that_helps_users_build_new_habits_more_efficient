import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";
// --------end of importing---------

export default function Header({ page }) {
  const color = "#65676b";

  const { user } = useSelector((user) => ({ ...user }));

  const [showSearchMenu, setShowSearchMenu] = useState(false);

  const [showAllMenu, setShowAllMenu] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const allmenu = useRef(null);

  const usermenu = useRef(null);

  useClickOutside(allmenu, () => setShowAllMenu(false));

  useClickOutside(usermenu, () => setShowAllMenu(false));

  return (
    <header>
      {/* //------ start header left------- */}
      <div className="header-left">
        <Link to="/" className="header-logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Donotrix"
            className="hide_input"
          />
        </div>
      </div>
      {/* ---------end header left-------- */}

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      {/* ---------Start header middle-------- */}

      <div className="header-middle ">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : ""}`}
        >
          For you
          {/* {page === "home" ? <HomeActive /> : <Home color={color} />}{" "} */}
        </Link>
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "" : "active"}`}
        >
          Following
          {/* {page === "home" ? <HomeActive /> : <Home color={color} />}{" "} */}
        </Link>
      </div>

      {/* ---------end header middle-------- */}

      {/* start the header right */}
      <div className="header-right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} />
          <span>{user?.first_name}</span>
        </Link>

        <div className="circle_icon hover1">
          <img
            src="../../../self-icon/chat-1.png"
            style={{ width: "19px", transform: "translateX(0.5px)" }}
          />
        </div>

        <div className="circle_icon hover1">
          <img
            src="../../../self-icon/lightbulb.png"
            style={{ width: "22px" }}
          />
          <div className="right_notification">5</div>
        </div>

        <div
          className={`circle_icon hover1 ${
            showUserMenu ? "active_header" : ""
          }`}
          ref={usermenu}
          onClick={() => {
            setShowUserMenu((prev) => !prev);
          }}
        >
          <div style={{ transform: "translateY(2px)" }}>
            <ArrowDown />
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>

      {/* end the header right */}
    </header>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SettingsPrivacy from "./SettingsPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          {" "}
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} />
            <div className="mmenu_col">
              <span>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <span>See your profile</span>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give feedback</div>
              <div className="mmenu_span2">Help us improve donotrix</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(1);
            }}
          >
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings and privacy</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(2);
            }}
          >
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              setVisible(3);
            }}
          >
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className="mmenu_item hover3"
            onClick={() => {
              logout();
            }}
          >
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Log out</span>
          </div>
        </div>
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}

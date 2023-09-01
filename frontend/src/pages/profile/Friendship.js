import { useEffect, useRef } from "react";
import { useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
} from "../../functions/user";

export default function Friendship({ friendshipp, id }) {
  const menu = useRef(null);
  const resMenu = useRef(null);
  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(resMenu, () => setRespondMenu(false));
  const { user } = useSelector((state) => ({ ...state }));
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const [friendship, setFriendship] = useState(friendshipp);

  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(id, user.token);
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(id, user.token);
  };

  const acceptRequestHandler = async () => {
    setFriendship((friendshipp.requestReceived = false));
    await acceptRequest(id, user.token);
  };
  const deleteRequestHandler = async () => {
    setFriendship((friendshipp.requestReceived = false));
    await deleteRequest(id, user.token);
  };
  const cancelRequestHandler = async () => {
    setFriendship((friendshipp.requestSent = false));
    await cancelRequest(id, user.token);
  };
  console.log(friendshipp);
  return (
    <div className="friendship">
      {console.log(friendship)}
      {friendship?.following ? (
        <div className="friends_menu_wrap">
          <button
            className="gray_btn hover2"
            onClick={() => {
              setFriendsMenu(!friendsMenu);
            }}
          >
            Following
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" /> Favorites
              </div>

              <div
                className="open_cover_menu_item hover1"
                onClick={() => unfollowHandler()}
              >
                <img src="../../../icons/unfollowOutlined.png" /> Unfollow
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent && (
          <div className="friends_menu_wrap" onClick={() => followHandler()}>
            <button className="blue_btn hover4">Follow</button>
          </div>
        )
      )}
      {friendship?.requestSent && (
        <div className="friends_menu_wrap">
          <button
            className="gray_btn hover2"
            onClick={() => cancelRequestHandler()}
          >
            Cancel Request
          </button>
        </div>
      )}
      {friendship?.requestReceived && (
        <div
          className="friends_menu_wrap"
          onClick={() => {
            setRespondMenu(!respondMenu);
          }}
        >
          <button className="blue_btn hover2">Respond</button>
        </div>
      )}
      {respondMenu && (
        <div className="open_cover_menu" ref={resMenu}>
          <div
            className="open_cover_menu_item hover1"
            onClick={() => acceptRequestHandler()}
          >
            Accept
          </div>
          <div
            className="open_cover_menu_item hover1"
            onClick={() => deleteRequestHandler()}
          >
            Delete
          </div>
        </div>
      )}
      <button
        className={
          friendship?.following ? "blue_btn hover2" : "gray_btn hover2"
        }
      >
        Message
      </button>
    </div>
  );
}

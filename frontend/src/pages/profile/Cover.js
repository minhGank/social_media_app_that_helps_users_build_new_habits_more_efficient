import { useRef } from "react";
import { useState } from "react";
import useClickOutside from "../../helpers/clickOutside";

export default function Cover({ cover, visitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  return (
    <div className="profile_cover">
      {cover && <img src={cover} className="cover" />}

      {/* ----div for update the cover photo---- */}
      {!visitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => {
              setShowCoverMenu(!showCoverMenu);
            }}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>

          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <i className="photo_icon"></i>
                Select Photo
              </div>

              <div className="open_cover_menu_item hover1">
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
          {/* ----end div for update the cover photo---- */}
        </div>
      )}
    </div>
  );
}

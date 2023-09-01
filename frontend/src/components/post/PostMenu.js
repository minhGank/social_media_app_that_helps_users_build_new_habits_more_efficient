import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnclickOutside from "../../helpers/clickOutside";
export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnclickOutside(menu, () => setShowMenu(false));
  return (
    <ul className="post_menu" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved item"
      />

      <div className="line"></div>

      {test && <MenuItem icon="edit_icon" title="Edit Post" />}

      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notification for this post."
          subtitle="I'm concerned about this post."
        />
      )}

      {imagesLength && <MenuItem icon="download_icon" title="Download" />}

      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}

      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}

      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notification for this post."
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translation." />}
      {test && <MenuItem icon="date_icon" title="Edit date." />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment." />
      )}
      {test && <div className="line"></div>}
      {test && <MenuItem icon="archive_icon" title="Move to archive." />}
      {test && (
        <MenuItem
          icon="trash_icon"
          title="Move to trash."
          subtitle="Items in your trash will be deleted after 30 days."
        />
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post."
          subtitle="I'm concerned about this post."
        />
      )}
    </ul>
  );
}

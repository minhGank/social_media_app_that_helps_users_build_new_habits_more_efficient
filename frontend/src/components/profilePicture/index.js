import { useRef } from "react";
import "./style.css";
import { useState } from "react";
import UpdataProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";
export default function ProfilePicture({ setShow, pRef, photos, userName }) {
  const refInput = useRef(null);
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setShow(false);
  });
  const { user } = useSelector((state) => ({ ...state }));
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/gif" &&
      file.type !== "image/png" &&
      file.type !== "image/webp"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size >= 1024 * 1024 * 5) {
      setError(`${file.name} is too large.`);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        accept="image/*"
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
      />

      <div className="postBox pictureBox">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>

          <span>Update profile picture</span>
        </div>

        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => {
                refInput.current.click();
              }}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>

            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>

        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button
              onClick={() => {
                setError("");
              }}
              className="blue_btn"
            >
              Try again
            </button>
          </div>
        )}

        <div className="old_pictures_wrap scrollbar">
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_picture`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  style={{ width: "100px" }}
                  onClick={() => {
                    setImage(photo.secure_url);
                  }}
                />
              ))}
          </div>

          <h4>Other Pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_picture`
              )
              .map((photo) => (
                <img
                  onClick={() => {
                    setImage(photo.secure_url);
                  }}
                  src={photo.secure_url}
                  key={photo.public_id}
                />
              ))}
          </div>
        </div>
      </div>
      {image && (
        <UpdataProfilePicture
          setError={setError}
          image={image}
          setShow={setShow}
          setImage={setImage}
          pRef={pRef}
        />
      )}
    </div>
  );
}

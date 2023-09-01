import { useState } from "react";
import "./style.css";
import EmojiPickerBackground from "./EmojiPickerBackground";
import { useRef } from "react";
import AddToYourPost from "./AddToYourPost";
import Imagepreview from "./ImagePreview";
import PulseLoader from "react-spinners/PulseLoader";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/post";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

export default function CreatePostPopup({ user, setVisable, day, habit }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setVisable(false);
  });

  //----------function for submitting-----------
  const postSubmit = async () => {
    //-----FUNCTION WHEN THERE'IS BACKGROUND IN THE POST------
    if (background) {
      setLoading(true);
      //send the the data to the function createPost, in return, get "ok" or error to the variable response
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token,
        day,
        habit._id
      );
      //make the loading icon run while waiting for backend to response
      setLoading(false);
      // ---after the backend is done, if post submitting is ok, this will happen
      if (response.status === "ok") {
        setBackground("");
        setText("");
        setVisable(false);
        // if there is an error in SubmitEvent, setError state will have the error value from variable response
      } else {
        setError(response);
      }
    } //-----FUNCTION WHEN THERE'RE IMAGES IN THE POST------
    else if (images && images.length) {
      setLoading(true);

      const postImages = images.map((img, i) => {
        return dataURItoBlob(img);
      });

      const path = `${user.username}/post_images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token,
        day,
        habit._id
      );
      if (res.status === "ok") {
        setLoading(false);
        setText("");
        setVisable(false);
        setImages("");
      } else {
        setError(res);
      }
    } //-----FUNCTION WHEN THERE'S ONLY TEXT IN THE POST------
    else if (text) {
      setLoading(true);

      //send the the data to the function createPost, in return, get "ok" or error to the variable response
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token,
        day,
        habit._id
      );
      //make the loading icon run while waiting for backend to response
      setLoading(false);
      // ---after the backend is done, if post submitting is ok, this will happen
      if (response.status === "ok") {
        setBackground("");
        setText("");
        setVisable(false);
        // if there is an error in SubmitEvent, setError state will have the error value from variable response
      } else {
        setError(response);
      }
    }
    // FUNCTION WHEN THERE'S NOTHING IN THE POST
    else {
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisable(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" />
              <span>Public </span>
              <i className="arrowDown_icon" />
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground
              day={day}
              habit={habit}
              text={text}
              setText={setText}
              user={user}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <Imagepreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className="post_submit"
          onClick={() => {
            postSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="white" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}

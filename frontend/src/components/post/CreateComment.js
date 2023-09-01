import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import PostMenu from "./PostMenu";
import { comment } from "../../functions/react";
import { ClipLoader } from "react-spinners";
export default function CreateComment({ user, postId, setComments, setCount }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [text, setText] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);
  const imgInput = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  //function for someone clicking the emoji: the emoji appears in the cursor, the cursor go to the next position after the emoji
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

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
      setCommentImage(event.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (text) {
        setLoading(true);
        const comments = await comment(postId, text, user.token);
        setComments(comments);
        setCount((prev) => ++prev);
        setText("");
        setCommentImage("");
        setLoading(false);
        console.log(comments);
      }
    }
  };
  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}

          {/* <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg, image/png, image/gif, image/webp"
            onChange={handleImage}
          /> */}
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
          <input
            type="text"
            placeholder="Add a comment"
            ref={textRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyUp={(e) => {
              handleComment(e);
            }}
          />
          <div className="comment_circle">
            <ClipLoader
              size={20}
              style={{ marginTop: "5px", color: "#1876f2" }}
              loading={loading}
            />
          </div>

          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
        </div>
      </div>
      {/* {commentImage && (
        <div
          className="comment_img_preview"
          onClick={() => {
            setCommentImage("");
          }}
        >
          <img src={commentImage} />
          <div className="small_white_circle">
            <i className="exit_icon"></i>
          </div>
        </div>
      )} */}
    </div>
  );
}

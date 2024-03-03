import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";

export default function Imagepreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
  habit,
  day,
}) {
  const imageInputRef = useRef(null);

  //CREATE FUNCTION THAT TAKE IMG FROM OUR COMPUTER TO PUT IT IN THE POST
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(`${img.name} is not a image`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(
          `${img.name} is too large, choose a file that is less than 5MB.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  //END OF FUNCTION THAT TAKE IMG FROM OUR COMPUTER TO PUT IT IN THE POST

  return (
    <div className="overflow_a scrollbar">
      {/* text area + emoji picker */}
      <EmojiPickerBackground
        text={text}
        setText={setText}
        user={user}
        day={day}
        habit={habit}
        type2
      />
      {/* end of text area + emoji picker */}

      {/* input for adding image */}
      <div className="add_pics_wrap">
        <input
          onChange={handleImages}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={imageInputRef}
        />
        {/* end of input for adding image */}

        {/* set condition for the adding image to appear */}
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Video</span>
              <span> or drag and drop</span>
            </div>
          </div>
        )}
        {/* end of setting condition for the adding image to appear */}

        <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add photos from your mobile device</div>
          <span className="addphone_btn">Add</span>
        </div>
      </div>
    </div>
  );
}

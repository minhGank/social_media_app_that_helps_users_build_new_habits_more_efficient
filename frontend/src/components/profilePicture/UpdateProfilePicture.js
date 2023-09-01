import { useCallback, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";
export default function UpdataProfilePicture({
  setShow,
  setError,
  image,
  setImage,
  pRef,
}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      //---------start sending profile image to cloudinary----------
      let img = await getCroppedImage();
      setLoading(true);
      let blob = await fetch(img).then((b) => b.blob());
      console.log("this is blob:", blob);
      const path = `${user.username}/profile_picture`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      //---------end sending image to cloudinary----------

      console.log(res);
      //---------start updating url of profile picture of user in database----------
      const updated_picture = await updateprofilePicture(
        res[0].url,
        user.token
      );
      //---------end updating url of profile picture of user in database----------

      //-------------below will be comment to avoid create a post from updating profile
      // if (updated_picture === "ok") {
      //   //---------start creating a new post of the updated profile pics ----------

      //   const new_post = await createPost(
      //     "profilePicture",
      //     null,
      //     description,
      //     res,
      //     user.id,
      //     user.token
      //   );
      if (updated_picture === "ok") {
        setLoading(false);
        pRef.current.style.backgroundImage = `url(${res[0].url})`;
        setShow(false);
        setImage("");
        Cookies.set(
          "user",
          JSON.stringify({
            ...user,
            picture: res[0].url,
          })
        );
        dispatch({ type: "UPDATEPICTURE", payload: res[0].url });
      } else {
        setError(updated_picture);
        setLoading(false);
      }
      //---------end of creating a new post of the updated profile pics ----------
      // } else {
      //   setError(updated_picture);
      //   setLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div
          className="small_circle"
          onClick={() => {
            setImage("");
          }}
        >
          <i className="exit_icon"></i>
        </div>

        <span>Update profile picture</span>
      </div>

      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider ">
          <div
            className="slider_circle hover1"
            onClick={() => {
              zoomOut();
            }}
          >
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            step={0.15}
            ref={slider}
            value={zoom}
          />
          <div
            className="slider_circle hover1"
            onClick={() => {
              zoomIn();
            }}
          >
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn">
          <i className="crop_icon"></i>
          Crop Photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>
          Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div
          className="blue_link"
          onClick={() => {
            setImage("");
          }}
        >
          Cancel
        </div>
        <button className="blue_btn" onClick={() => updateProfilePicture()}>
          {loading ? <PulseLoader color="white" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}

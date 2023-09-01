import { useEffect, useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import Friendship from "./Friendship";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";
import axios from "axios";

export default function ProfilePictureInfos({
  userName,
  photos,
  profile,
  visitor,
  detailss,
  showBio,
  setShowBio,
}) {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);

  //-------------------stuff from intro component----------------
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState(detailss);
  const [showEditProfile, setShowEditProfile] = useState(false);
  useEffect(() => {
    setDetails(detailss);
  }, [detailss]);
  const editMenu = useRef(null);
  useClickOutside(editMenu, () => {
    setShowEditProfile(false);
  });

  // const initial = {
  //   bio: details?.bio ? details.bio : "",
  // };

  // const [infos, setInfos] = useState(initial);
  // // const [showBio, setShowBio] = useState(false);
  // const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : "100");

  // const handleBioChange = (e) => {
  //   setInfos({ ...infos, bio: e.target.value });
  //   setMax(100 - e.target.value.length);
  // };

  // const updateDetails = async () => {
  //   try {
  //     const { data } = await axios.put(
  //       `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
  //       {
  //         infos,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     setShowBio(false);
  //     setDetails(data);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };
  //------------------- end of stuff from intro component----------------

  return (
    <div className="profile_img_wrap">
      {show && (
        //profilePicture component is for the update profilepic popup
        <ProfilePicture
          userName={userName}
          photos={photos}
          setShow={setShow}
          pRef={pRef}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!visitor && (
            <div className="profile-edit">
              <div
                className="profile_circle hover1"
                onClick={() => {
                  setShow(true);
                }}
              >
                <i className="camera_filled_icon"></i>
              </div>
              <div
                className="edit-profile hover1"
                ref={editMenu}
                onClick={() => {
                  setShowBio(!showBio);
                }}
              >
                <i className="edit_icon"></i>
              </div>
            </div>
          )}
        </div>

        <div className="profile_w_col">
          <div className="profile_name">
            {profile.first_name} {profile.last_name}
          </div>
        </div>
      </div>
    </div>
  );
}

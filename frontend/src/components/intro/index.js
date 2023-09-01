import { useEffect, useState } from "react";
import "./style.css";
import Bio from "./Bio";
import axios from "axios";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";
import { useRef } from "react";
import Friendship from "../../pages/profile/Friendship";

//details that in the prop is the details of profile of user
export default function Intro({
  detailss,
  visitor,
  showBio,
  setShowBio,
  profile,
}) {
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

  const initial = {
    bio: details?.bio ? details.bio : "",
  };
  const [infos, setInfos] = useState(initial);
  // const [showBio, setShowBio] = useState(false);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : "100");

  const handleBioChange = (e) => {
    setInfos({ ...infos, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };

  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="profile_card">
      <div className="username_profile_div">{profile?.username}</div>

      {/* ----------- start the div for showing the bio---------- */}
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio}</span>
        </div>
      )}
      {/* ----------- end the div for showing the bio---------- */}
      {/* ----------- start the div for showing the add bio---------- */}
      {!details?.bio && !showBio && !visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => {
            setShowBio(true);
          }}
        >
          Add Bio
        </button>
      )}

      {/* ----------- end the div for showing the add bio---------- */}

      {/* ----------- start the div for edtiting the bio---------- */}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          setShowBio={setShowBio}
          setMax={setMax}
          handleBioChange={handleBioChange}
          updateDetails={updateDetails}
        />
      )}
      {/* ----------- end the div for edtiting the bio---------- */}

      {visitor && (
        <Friendship friendshipp={profile?.friendship} id={profile._id} />
      )}
    </div>
  );
}

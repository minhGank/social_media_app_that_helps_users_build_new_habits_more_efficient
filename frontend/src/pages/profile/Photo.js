import { useReducer } from "react";
import { photosReducer } from "../../functions/reducer";
import { useEffect } from "react";
import axios from "axios";

export default function Photos({ userName, token, photos }) {
  // const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
  //   loading: false,
  //   photos: {},
  //   error: "",
  // });
  // const getPhotos = async () => {
  //   try {
  //     //first, create an action which is the profile_request, in this action, ask for the data of every post in the backend, backend will send back data of every single post in one array
  //     //in the array that back end send back, it will contain the id, type, text, images, user,...
  //     dispatch({
  //       type: "PHOTOS_REQUEST",
  //     });
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BACKEND_URL}/listImages`,
  //       { path, sort, max },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     //second, after backend finish sending the data of every post, set the action to request_succes and put that data in payload
  //     //the data in the payload will then pass to variable profile (go to function/reducer/getProfile for more details)

  //     dispatch({
  //       type: "PHOTOS_SUCCESS",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "PHOTOS_ERROR",
  //       payload: error.response.data.message,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getPhotos();
  // }, [userName]);
  // {
  //   console.log(photos);
  // }
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} />
            </div>
          ))}
      </div>
    </div>
  );
}

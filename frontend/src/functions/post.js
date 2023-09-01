import axios from "axios";

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  token,
  day,
  habit
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
        day,
        habit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};

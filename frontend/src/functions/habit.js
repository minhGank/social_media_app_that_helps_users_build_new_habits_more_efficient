import axios from "axios";

export const addHabit = async (id, token) => {
  await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/addHabit`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

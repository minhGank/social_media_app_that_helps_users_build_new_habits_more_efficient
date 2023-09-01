import axios from "axios";

export const addHabit = async (name, description, id, token) => {
  await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/addHabit`,
    { name, description, id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

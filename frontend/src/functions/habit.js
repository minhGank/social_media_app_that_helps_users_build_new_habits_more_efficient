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

export const getUserHabit = async (token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/getUserHabit`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("getUserHabit", error);
  }
};

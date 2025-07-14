import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const postFormInfo = async (formInfo) => {
  const response = await axios.post(
    `${API_URL}/forms/`,
    formInfo,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
};
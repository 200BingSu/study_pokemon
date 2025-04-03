import axios from "axios";
import { baseUrl } from "../constants/URL";

export const translateToKor = async (id?: number, name?: string) => {
  const url = `${baseUrl}/language/${id}${name}/`;
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    return null;
  }
};

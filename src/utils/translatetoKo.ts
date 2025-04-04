import { KoCode } from "../types/Enum";

export const findKor = (data: any[]) => {
  const result = data.find(item => item.language.name === KoCode.iso639);
  return result;
};

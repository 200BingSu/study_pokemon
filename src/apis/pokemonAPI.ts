import axios from "axios";
import { Pokemon } from "../types/type";
import { baseUrl } from "../constants/URL";
import React from "react";

// 포켓몬 정보 자세히 보기
export const getPokemonInfo = async (): Promise<Pokemon | null> => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000";
  try {
    const res = await axios.get<Pokemon>(url);
    const data = res.data;
    console.log("data", res.data);
    return data;
  } catch (error) {
    console.log("포켓몬 조회", error);
    return null;
  }
};

// 포켓몬 폼
export const getPokemonForms = async (url: string) => {
  try {
    const res = await axios.get<Pokemon>(url);
    const data = res.data;
    console.log("data", res.data);
    return data;
  } catch (error) {
    console.log("사진 조회", error);
    return null;
  }
};

// default
export const getApi = async (
  api: string,
  showconsole?: boolean,
  id?: number,
  name?: string,
) => {
  const url = id ? `${baseUrl}/${api}/${id}` : `${baseUrl}/${api}/${name}`;
  try {
    const res = await axios.get(url);
    const data = res.data;
    showconsole && console.log(`${api}`, data);

    return data;
  } catch (error) {
    return null;
  }
};

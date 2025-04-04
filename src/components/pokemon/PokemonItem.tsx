import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../../apis/pokemonAPI";
import { PokeUrl } from "../../pages/Index";
import { Pokemon, PokemonSpecies } from "../../types/type";
import { findKor } from "../../utils/translatetoKo";
import TypeIcon from "./TypeIcon";
import { Spin } from "antd";

interface PokemonItemProps {
  key: number;
  item: PokeUrl;
}

const PokemonItem = ({ item }: PokemonItemProps) => {
  const apiUrl = item.url;
  const apiUrlArr = apiUrl.split("/");
  const id = Number(apiUrlArr[6]);
  //router
  const navigate = useNavigate();

  const url = item.url;
  const initPokemonData: Pokemon = {
    id: 0,
    name: "",
    base_experience: 0,
    height: 0,
    is_default: false,
    order: 0,
    weight: 0,
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: "",
    moves: [],
    past_types: [],
    sprites: {
      back_default: "",
      back_female: "",
      back_shiny: "",
      back_shiny_female: "",
      front_default: "",
      front_female: "",
      front_shiny: "",
      front_shiny_female: "",
    },
    cries: {
      latest: "",
      legacy: "",
    },
    species: {
      name: "",
      url: "",
    },
    stats: [],
    types: [],
  };

  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(
    initPokemonData,
  );
  const [species, setSpecies] = useState<PokemonSpecies | null>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokeInfo = async () => {
    setIsLoading(true);
    const pokeInfo = await getApi("pokemon", true, id);
    setPokemonInfo(pokeInfo);
    const getSpecies = await getApi("pokemon-species", false, id);
    setSpecies(getSpecies);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPokeInfo();
  }, [url]);

  //ID 포멧
  const formatId = (id: number) => {
    if (typeof id === "number") {
      return id.toString().padStart(5, "0");
    } else {
      return "00000";
    }
  };
  //   이름 포멧
  const formatName = () => {
    if (species) {
      const koName = findKor(species?.names);
      return koName.name;
    }
  };
  // 타입 포멧
  const typeNameArr = pokemonInfo?.types?.map(item => item.type.name) || [];

  const handleClickItem = () => {
    navigate(`/pokemon?id=${pokemonInfo?.id}&name=${formatName()}`);
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <div
          className="group rounded-md overflow-hidden
                    w-64 h-48
                    flex flex-col
                    border border-slate-200 shadow-sm
                    hover:border-blue-200
                    cursor-pointer"
          onClick={handleClickItem}
        >
          {/* 사진 */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={pokemonInfo?.sprites?.front_default}
              alt={pokemonInfo?.name}
            />
          </div>
          {/* 이름, 아이디, 속성 */}
          <div
            className="bg-blue-300  p-4 flex items-center justify-between
      group-hover:bg-blue-400 group-hover:bg-opacity-90 transition-colors duration-300"
          >
            <p className="flex items-center gap-3">
              <span className="text-slate-100">ID: {id && formatId(id)}</span>
              <span className="text-slate-100">{formatName()}</span>
            </p>
            <div className="flex items-center gap-1">
              {typeNameArr?.map((item, index) => {
                return <TypeIcon key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default PokemonItem;

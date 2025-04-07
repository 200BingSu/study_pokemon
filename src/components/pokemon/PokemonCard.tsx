import {
  BringToFront,
  Cat,
  Headphones,
  SendToBack,
  Sparkle,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApi } from "../../apis/pokemonAPI";
import { PokeUrl } from "../../pages/Index";
import { KoCode } from "../../types/Enum";
import { Pokemon, PokemonSpecies } from "../../types/type";
import { findKor } from "../../utils/translatetoKo";
import TypeIcon from "./TypeIcon";
import StatGraph from "./StatGraph";

interface Ability {
  name: {
    language: PokeUrl;
    name: string;
  };
  dec: {
    flavor_text: string;
    language: PokeUrl;
  };
}

interface PokemonCardProps {
  pokemonInfo: Pokemon;
  species: PokemonSpecies;
}

const PokemonCard = ({ pokemonInfo, species }: PokemonCardProps) => {
  // router
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const name = searchParams.get("name");
  const [imgUrl, setImgUrl] = useState(pokemonInfo.sprites.front_default);
  const [abilities, setAbilities] = useState<Ability[]>([]);

  console.log("pokemonInfo", pokemonInfo);
  console.log("species", species);

  const getKorAbilitiesArr = async () => {
    const abilitiesArr = pokemonInfo.abilities.map(item => item.ability.name);
    const KorArr = await Promise.all(
      abilitiesArr.map(async item => {
        const data = await getApi(`ability`, true, undefined, item);
        const korName = data.names.find(
          (entry: any) => entry.language.name === KoCode.iso639,
        );
        const korDescript = data.flavor_text_entries.find(
          (entry: any) => entry.language.name === KoCode.iso639,
        );
        const KoObject = { name: korName, dec: korDescript };
        console.log("KoObject", KoObject);
        return KoObject; // 못 찾으면 원래 이름 반환
      }),
    );
    console.log("KorArr", KorArr);
    setAbilities(KorArr);
    return KorArr;
  };

  //   이름 포멧
  const formatName = () => {
    if (species) {
      const koName = findKor(species?.names);
      return koName.name;
    }
  };
  // 울음소리
  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.1;
    audio.play().catch(error => {
      console.error("Audio playback failed:", error);
    });
  };
  // 키 포멧
  const formatHeight = (height: number) => {
    // 기본 10cm 단위(heifht 10=1m)
    return `${height / 10}m`;
  };
  // 타입
  const typeNameArr = pokemonInfo?.types?.map(item => item.type.name) || [];
  // 차트용 포멧
  const chartData = [
    { stat: "hp", value: pokemonInfo.stats[0]?.base_stat },
    { stat: "attack", value: pokemonInfo.stats[1]?.base_stat },
    { stat: "defense", value: pokemonInfo.stats[2]?.base_stat },
    { stat: "specialAttack", value: pokemonInfo.stats[3]?.base_stat },
    { stat: "specialDefense", value: pokemonInfo.stats[4]?.base_stat },
    { stat: "speed", value: pokemonInfo.stats[5]?.base_stat },
  ];

  console.log("chartData", chartData);
  useEffect(() => {
    if (pokemonInfo?.sprites?.front_default) {
      setImgUrl(pokemonInfo.sprites.front_default);
    }
    if (pokemonInfo) {
      getKorAbilitiesArr();
    }
  }, [pokemonInfo]);

  return (
    <div
      className="px-5 py-8 w-1/2 min-w-[500px] flex gap-8 justify-center  items-center rounded-md border border-slate-200 shadow-md shadow-slate-100
      "
    >
      <div
        className="flex flex-wrap items-center justify-center gap-5
                     "
      >
        {/* 모습 */}
        <section
          className="flex flex-col justify-center items-center gap-4
                    pr-4
                   
                    "
        >
          <div className="bg-slate-100 w-28 aspect-square object-center overflow-hidden rounded-md">
            <img
              src={imgUrl}
              alt={pokemonInfo?.name}
              className="w-full h-full"
            />
          </div>
          {/* 모습 방향 버튼 */}
          <div className="flex flex-col gap-2">
            {/* 디폴트 */}
            <div className="flex items-center gap-2">
              <Cat className="text-slate-600 w-5" />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="relative group w-6 aspect-square flex items-center justify-center
                        bg-slate-200 rounded-md hover:bg-slate-300/70 transition-colors duration-300"
                  onClick={() => setImgUrl(pokemonInfo.sprites.front_default)}
                >
                  <BringToFront className="text-sm w-4 text-slate-600" />
                  <p
                    className="absolute -top-5 -left-1 w-20 text-xs text-slate-600 bg-slate-100
                  invisible group-hover:visible"
                  >
                    front-default
                  </p>
                </button>
                <button
                  type="button"
                  className="relative group w-6 aspect-square flex items-center justify-center
                        bg-slate-200 rounded-md hover:bg-slate-300/70 transition-colors duration-300"
                  onClick={() => setImgUrl(pokemonInfo.sprites.back_default)}
                >
                  <SendToBack className="text-sm w-4 text-slate-600" />
                  <p
                    className="absolute -top-5 -left-1 w-20 text-xs text-slate-600 bg-slate-100
                  invisible group-hover:visible"
                  >
                    back-default
                  </p>
                </button>
              </div>
            </div>
            {/* 샤이니 */}
            <div className="flex items-center gap-2">
              <Sparkle className="text-slate-500 w-5" />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="relative group w-6 aspect-square flex items-center justify-center
                        bg-slate-200 rounded-md hover:bg-slate-300/70 transition-colors duration-300"
                  onClick={() => setImgUrl(pokemonInfo.sprites.front_shiny)}
                >
                  <BringToFront className="text-sm w-4 text-slate-600" />
                  <p
                    className="absolute -top-5 -left-1 w-20 text-xs text-slate-600 bg-slate-100
                  invisible group-hover:visible"
                  >
                    front-shiny
                  </p>
                </button>
                <button
                  type="button"
                  className="relative group w-6 aspect-square flex items-center justify-center
                        bg-slate-200 rounded-md hover:bg-slate-300/70 transition-colors duration-300"
                  onClick={() => setImgUrl(pokemonInfo.sprites.back_shiny)}
                >
                  <SendToBack className="text-sm w-4 text-slate-600" />
                  <p
                    className="absolute -top-5 -left-1 w-20 text-xs text-slate-600 bg-slate-100
                  invisible group-hover:visible"
                  >
                    back-shiny
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 정보 */}
        <section className="px-4 flex flex-col gap-2">
          {/* ID */}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap">
            <p className="text-slate-500 font-medium">ID:</p>
            <p className="text-slate-800">{id.toString().padStart(5, "0")}</p>
          </div>
          {/* 이름 */}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap">
            <p className="text-slate-500 font-medium">NAME:</p>
            <p className="text-slate-800">{name}</p>
          </div>
          {/* 특성 */}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap">
            <p className="text-slate-500 font-medium">특성:</p>
            <div className="text-slate-800 flex items-center gap-1">
              {abilities?.map((item, index) => (
                <p key={index} className="relative group">
                  <span>
                    {index === abilities.length - 1
                      ? `${item.name.name}`
                      : `${item.name.name},`}
                  </span>
                  <span
                    className="absolute -top-4 left-0 px-1 bg-slate-100 text-sm text-slate-600
                  invisible group-hover:visible
                  "
                  >
                    {item.dec.flavor_text}
                  </span>
                </p>
              ))}
            </div>
          </div>
          {/* 울음 */}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap items-center">
            <p className="text-slate-500 font-medium">울음소리:</p>
            <button
              type="button"
              onClick={() => playSound(pokemonInfo.cries.latest)}
            >
              <Headphones className="text-slate-800 w-5" />
            </button>
          </div>
          {/* 키 */}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap items-center">
            <p className="text-slate-500 font-medium">높이:</p>
            <p>{formatHeight(pokemonInfo.height)}</p>
          </div>
          {/* 타입 */}
          <div className="grid grid-cols-2 whitespace-nowrap items-center">
            <p className="text-slate-500 font-medium">타입:</p>
            <div className="flex items-center gap-1">
              {typeNameArr?.map((item, index) => {
                return <TypeIcon key={index} item={item} />;
              })}
            </div>
          </div>
        </section>
      </div>
      <section className="flex items-center px-10">
        {/* <p>그래프</p> */}
        <StatGraph chartData={chartData} />
      </section>
    </div>
  );
};

export default memo(PokemonCard);

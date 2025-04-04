import { BringToFront, Cat, SendToBack, Sparkle } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pokemon, PokemonSpecies } from "../../types/type";
import { findKor } from "../../utils/translatetoKo";
import { getApi } from "../../apis/pokemonAPI";
import { KoCode } from "../../types/Enum";

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
  const [abilities, setAbilities] = useState([]);

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
      className="flex rounded-md border border-slate-200 shadow-md shadow-slate-100
                    p-5"
    >
      {/* 모습 */}
      <section
        className="flex flex-col justify-center items-center gap-4
                    pr-4
                    border-r border-slate-200"
      >
        <div className="bg-slate-100 w-fit overflow-hidden rounded-md">
          <img src={imgUrl} alt={pokemonInfo?.name} className="" />
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
      <section className="px-4 ">
        <div className="grid grid-cols-2 gap-2 whitespace-nowrap overflow-hidden">
          <p className="text-slate-500 font-medium">ID:</p>
          <p className="text-slate-800">{id.toString().padStart(5, "0")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 whitespace-nowrap overflow-hidden">
          <p className="text-slate-500 font-medium">NAME:</p>
          <p className="text-slate-800">{name}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 whitespace-nowrap overflow-hidden">
          <p className="text-slate-500 font-medium">특성:</p>
          <p className="text-slate-800 flex items-center gap-1">
            {abilities?.map((item, index) => (
              <span key={index}>
                {/* {index === abilities.length - 1 ? item : `${item.name.name},`} */}
                {item.name.name}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

export default memo(PokemonCard);

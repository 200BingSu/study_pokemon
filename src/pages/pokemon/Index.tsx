import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApi } from "../../apis/pokemonAPI";
import PokemonCard from "../../components/pokemon/PokemonCard";
import { Pokemon, PokemonSpecies } from "../../types/type";
import { initPokemonData, initPokemonSpecies } from "../../mock/initData";

function Index() {
  //router
  const [searchParmas] = useSearchParams();
  const id = Number(searchParmas.get("id"));

  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>(initPokemonData);
  const [species, setSpecies] = useState<PokemonSpecies>(initPokemonSpecies);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokeInfo = async () => {
    setIsLoading(true);
    const pokeInfo = await getApi("pokemon", false, id);
    setPokemonInfo(pokeInfo);
    const getSpecies = await getApi("pokemon-species", false, id);
    setSpecies(getSpecies);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPokeInfo();
  }, [id]);

  return (
    <div>
      {/* 기본 정보 */}
      <section className="flex items-center justify-center">
        <PokemonCard pokemonInfo={pokemonInfo} species={species} />
      </section>

      {/* species */}
    </div>
  );
}

export default Index;

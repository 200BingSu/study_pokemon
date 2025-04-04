import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PokemonItem from "../components/pokemon/PokemonItem";

export interface PokeUrl {
  name: string;
  url: string;
}
interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokeUrl[];
}

const Index = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokeUrl[]>([]);
  const [page, setPage] = useState(1);

  // 포켓몬 API 호출
  const getPokemonList = async () => {
    setIsLoading(true);
    const url = `https://pokeapi.co/api/v2/pokemon`;
    try {
      const res = await axios.get<PokemonList>(`${url}?limit=${page * 100}`);
      const data = res.data;
      if (data) {
        setPokemonList(data.results);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이징 처리
  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting && !isLoading) {
      console.log("페이지 증가");
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    // 관찰 시작
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    // cleanup
    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    getPokemonList();
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <section className="flex justify-center flex-wrap gap-4 ">
        {pokemonList?.map((item, index) => (
          <PokemonItem key={index} item={item} />
        ))}
        {/* 페이징 */}
        <div id="observer" ref={observerTarget}></div>
      </section>
    </div>
  );
};

export default Index;

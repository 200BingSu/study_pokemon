import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/URL";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PokeUrl {
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
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokeUrl[]>([]);
  const [currentPagenation, setCurrentPagenation] = useState(1);
  const [url, setUrl] = useState(`${baseUrl}/pokemon?limit=30`);
  const [maxCount, setMaxCount] = useState(0);
  const [page, setPage] = useState<number>(1);
  const pageArr = [
    currentPagenation,
    currentPagenation + 1,
    currentPagenation + 2,
    currentPagenation + 3,
    currentPagenation + 4,
  ];

  // 포켓몬 API 호출
  const getPokemonList = async () => {
    setIsLoading(true);
    const url = `${baseUrl}/pokemon`;
    try {
      const res = await axios.get<PokemonList>(`${url}?limit=${page * 30}`);
      const data = res.data;
      if (data) {
        setPokemonList(data.results);
        setMaxCount(data.count);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          pokemonList.map(poke => <p key={poke.name}>{poke.name}</p>)
        )}
      </section>

      {/* 이동 버튼 */}
      <section className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPagenation === 1}
          onClick={() => {
            setCurrentPagenation(prev => prev - 5);
          }}
        >
          <ChevronLeft className="text-blue-950" />
        </button>

        {pageArr.map((page, index) => (
          <button type="button" key={index}>
            {index === pageArr.length - 1 ? `${page}` : `${page},`}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPagenation > Math.ceil(maxCount / 30)} // 마지막 페이지 체크
          onClick={() => {
            setCurrentPagenation(prev => prev + 5);
          }}
        >
          <ChevronRight className="text-blue-950" />
        </button>
      </section>
    </div>
  );
};

export default Index;

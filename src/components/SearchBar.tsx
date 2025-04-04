import { Button, Input } from "antd";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full pt-5 pb-20">
      <Input
        placeholder="Who's That Pokėmon?"
        size="large"
        suffix={<Search className="text-slate-300" />}
        className="w-2/3"
      />
      <Button size="large" className="text-slate-700">
        검색
      </Button>
    </div>
  );
};

export default SearchBar;

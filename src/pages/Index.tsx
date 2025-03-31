import { Button, Input } from "antd";
import { Search } from "lucide-react";

const Index = () => {
  return (
    <div className="p-16">
      {/* 검색 */}
      <div className="flex items-center gap-4 w-full">
        <Input
          placeholder="Who's That Pokėmon?"
          size="large"
          suffix={<Search className="text-slate-300" />}
          className="w-96"
        />
        <Button size="large">검색</Button>
      </div>
    </div>
  );
};

export default Index;

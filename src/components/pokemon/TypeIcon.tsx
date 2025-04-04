import { matchTypeColor } from "../../utils/match";

interface TypeIconProps {
  item: string;
  key?: number;
}

const TypeIcon = ({ item }: TypeIconProps) => {
  return (
    <div
      className={`flex items-center justify-center w-8 aspect-square rounded-full ${matchTypeColor(item)}`}
    >
      <img
        src={`/images/icons/${item}.svg`}
        alt={item}
        className="w-1/2 h-1/2 object-contain"
      />
    </div>
  );
};

export default TypeIcon;

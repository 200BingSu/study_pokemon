import { useNavigate } from "react-router-dom";
import { MenuList } from "../constants/Menu";
import { CgPokemon } from "react-icons/cg";

const SideNavigation = () => {
  //router
  const navigate = useNavigate();
  return (
    <div className="bg-blue-700 w-2/4 max-w-[300px] min-w-[250px] min-h-screen flex flex-col items-center ">
      {/* 로고 */}
      <div
        className=" w-[24vw] max-w-[220px] min-w-[210px] pt-10 pb-12"
        onClick={() => navigate("/")}
      >
        <img
          src="/images/logo.svg"
          alt="포켓몬"
          className="w-full h-full object-cover"
        />
      </div>
      {/* 메뉴 리스트 */}
      {/* <ul className="w-full flex flex-col gap-4 justify-start px-14">
        {MenuList.map(item => {
          return (
            <li
              key={item.key}
              onClick={() => {
                navigate(item.to);
              }}
              className="cursor-pointer text-lg flex items-center text-white gap-5
              hover:text-blue-100 transition-colors duration-300"
            >
              <i className="text-2xl">
                <CgPokemon />
              </i>
              {item.label}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default SideNavigation;

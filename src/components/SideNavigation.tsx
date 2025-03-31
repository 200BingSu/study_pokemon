import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
  //router
  const navigate = useNavigate();
  return (
    <div className="bg-blue-700 w-1/4 max-w-[300px] h-screen flex flex-col items-center px-4 py-5">
      {/* 로고 */}
      <div className=" w-[20vw] max-w-[250px]" onClick={() => navigate("/")}>
        <img
          src="/images/logo.svg"
          alt="포켓몬"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 메뉴 리스트 */}
      <ul>
        <li>{/* <Link to={""}></Link> */}</li>
      </ul>
    </div>
  );
};

export default SideNavigation;

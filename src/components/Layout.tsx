import { ChevronUpIcon } from "lucide-react";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideNavigation from "./SideNavigation";

function Layout() {
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full flex relative">
      <SideNavigation />
      <div className="px-16 py-14 w-full">
        <SearchBar />
        <Outlet />
      </div>
      <div
        className="fixed bottom-8 right-10 bg-blue-500 w-10 aspect-square flex items-center justify-center rounded-full"
        onClick={moveTop}
      >
        <ChevronUpIcon className="text-slate-50" />
      </div>
    </div>
  );
}

export default Layout;

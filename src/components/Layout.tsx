import { Outlet } from "react-router-dom";
import SideNavigation from "./SideNavigation";
import SearchBar from "./SearchBar";

function Layout() {
  return (
    <div className="w-full flex">
      <SideNavigation />
      <div className="px-10 py-14 w-full">
        <SearchBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

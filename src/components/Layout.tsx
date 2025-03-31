import { Outlet } from "react-router-dom";
import SideNavigation from "./SideNavigation";

function Layout() {
  return (
    <div className="w-full flex">
      <SideNavigation />
      <Outlet />
    </div>
  );
}

export default Layout;

import { Outlet, useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {

    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const { user } = useUser();

  return user ? (
    <div className="flex flex-col min-h-screen bg-[#F4F7FB]">
      {/* Navbar */}
      <nav className="w-full px-6 sm:px-10 h-15 flex items-center justify-between bg-white shadow-sm border-b border-gray-200 z-50">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer w-35 h-40 object-contain"
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      {/* Main Section */}
      <div className="flex flex-1 min-h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 p-4 sm:p-8 overflow-visible">
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
        <SignIn />
    </div>
  );
};

export default Layout;

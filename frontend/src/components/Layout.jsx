/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Menu, Bell } from "lucide-react";
import logo from "../assets/logo.png";

function Layout({ children }) {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    }

  }, []);

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={toggle} />

      <div className="flex-1 lg:ml-64 flex flex-col">

        {/* NAVBAR */}

        <div className="sticky top-0 z-50 bg-white border-b flex items-center justify-between px-6 py-3">

          {/* LEFT SECTION */}

          <div className="flex items-center gap-3">

            <button
              onClick={toggle}
              className="lg:hidden text-gray-700"
            >
              <Menu size={24} />
            </button>

            <img
              src={logo}
              alt="FinSight"
              className="w-8 h-8"
            />

            <h1 className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              FinSight AI
            </h1>

          </div>

          {/* RIGHT SECTION */}

          <div className="flex items-center gap-4">

            

            {/* NOTIFICATIONS */}

            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">

              <Bell className="w-5 h-5 text-gray-600" />

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>

            </button>

            {/* PROFILE */}

            {user && (

              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition"
              >

                <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">

                  {user?.name?.charAt(0)?.toUpperCase() || "U"}

                </div>

                <span className="hidden sm:block font-medium text-gray-700">
                  {user?.name}
                </span>

              </div>

            )}

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="flex-1 p-6">

          {children}

        </div>

        {/* MOBILE NAVIGATION */}

        <MobileNav />

      </div>

    </div>

  );

}

export default Layout;
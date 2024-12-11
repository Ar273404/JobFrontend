import React, { useState, useContext } from "react";
import { Context } from "../../index.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { FaPersonRays } from "react-icons/fa6";
import { MdOutlineCompost } from "react-icons/md";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { url } from "../../Api.jsx";
import { ImProfile} from "react-icons/im";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { MdLogout } from "react-icons/md";;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthorized, setAuthorized, user } = useContext(Context);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigateTo = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
    const handleProfileToggle = () => {
      setProfileOpen(!profileOpen);
    };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setAuthorized(true);
    }
  };

  // Handle link clicks when not authenticated
  const handleLinkClick = (path) => {
    if (!isAuthorized && path !== "/") {
      toast.error("Please login first");
      navigateTo("/login");
    }
  };

  return (
    <>
      <header className="flex items-center shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a className="w-16 h-full" href="/">
            <img
              src="https://freepngimg.com/thumb/jobs/8-2-jobs-png-picture-thumb.png"
              alt="logo"
              className="h-full w-full"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex  space-x-5">
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className="text-gray-500 font-bold hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
              <IoHome className="text-gray-500 mr-1" />
              <span className="text-gray-500 font-bold">Home</span>
            </Link>

            <Link
              to="/job/getall"
              onClick={() => handleLinkClick("/job/getall")}
              className="text-gray-500 font-bold hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
              <FaUserGraduate className="text-gray-500 mr-1" />
              <span className="text-gray-500 font-bold">All jobs</span>
            </Link>

            <Link
              to="/application/my"
              onClick={() => handleLinkClick("/application/my")}
              className="hover:text-[#007bff] text-gray-500 font-semibold text-[15px]">
              {user && user.role === "Employer" ? (
                <Link
                  to="/application/my"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <FaPersonRays className="text-gray-500 mr-1" />
                  <span className="text-gray-500 font-bold">
                    Applicant's Applications
                  </span>
                </Link>
              ) : (
                <Link
                  to="/application/my"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <FaUserCheck className="text-gray-500 mr-1" />
                  <span className="text-gray-500 font-bold">
                    My Applications
                  </span>
                </Link>
              )}
            </Link>

            {user && user.role === "Employer" ? (
              <>
                <Link
                  to="/job/post"
                  onClick={() => handleLinkClick("/job/post")}
                  className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <MdOutlineCompost className="text-gray-500 mr-1" />
                  <span className="text-gray-500 font-bold">Post New Job</span>
                </Link>
                <Link
                  to="/job/my"
                  onClick={() => handleLinkClick("/job/my")}
                  className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all">
                  <BsFillPostcardHeartFill className="text-gray-500 mr-1" />
                  <span>My Posted Jobs</span>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex max-lg:ml-auto space-x-3">
            <button
              id="toggleOpen"
              className="lg:hidden ml-4"
              onClick={handleToggleMenu}>
              <GiHamburgerMenu className="w-7 h-7" />
            </button>
            {!isAuthorized ? (
              <Link to="/login">
                <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  Login
                </button>
              </Link>
            ) : (
              // <button
              //   onClick={handleLogout}
              //   className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              //   Logout
              // </button>
              <div className="flex profilehidden max-lg:ml-auto space-x-3">
                {isAuthorized ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleProfileToggle}
                      className="flex items-center px-4 py-2 rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100">
                      <img
                        src="https://readymadeui.com/profile_6.webp"
                        alt="profile"
                        className="w-7 h-7 mr-3 rounded-full"
                      />
                      {user.firstName} {user.lastName}
                      <IoIosArrowDropdownCircle className="text-lg ml-1" />
                    </button>

                    {profileOpen && (
                      <ul className="fixed right-7 top-16 z-[1000] mt-1 w-max shadow-lg bg-white py-2 border border-gray-700 rounded-lg max-h-96 overflow-auto">
                        <Link to={"/profile"}>
                          <li className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                            <ImProfile className="mr-1 w-4 h-full" />
                            View Profile
                          </li>
                        </Link>
                        <li
                          onClick={handleLogout}
                          className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                          <MdLogout className="w-4 h-full mr-1 text-red-800" />
                          Logout
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigateTo("/login")}
                    className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Sidebar.css";
import { logout, useLogoutMutation } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../assets/images/profile.png";

const Sidebar = ({ children, title, menus }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [setLogout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = (route) => {
    if (active !== route) {
      setActive(route);
      navigate(route);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "ต้องการออกจะระบบ",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    }).then((result) => {
      if (result.isConfirmed) {
        setLogout();
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 lg:w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center pl-2.5 mb-5">
              <span className="self-center text-xl font-semibold dark:text-white">
                {title}
              </span>
            </div>

            <ul className="space-y-2 font-medium">
              {menus.map((menu) => {
                return (
                  <li key={menu.id}>
                    <div
                      onClick={() => handleClick(menu.route[0])}
                      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                        menu.route.find((elm) => elm === active)
                          ? "active"
                          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-lg text-gray-600">{menu.icon}</span>
                      <span className="ml-3">{menu.title}</span>
                    </div>
                  </li>
                );
              })}
              <li>
                <div
                  onClick={() => handleLogout()}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="text-lg text-gray-600">
                    <FaSignOutAlt />
                  </span>
                  <span className="ml-3">Log Out</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="mx-auto">
            <img
              alt="user profile"
              src={Profile}
              className="profile-img mx-auto"
              width="150"
              height="150"
            />
            <div className="mt-3">{userInfo.email}</div>
          </div>
        </div>
      </aside>
      <div className="sm:ml-64">{children}</div>
    </>
  );
};

export default Sidebar;

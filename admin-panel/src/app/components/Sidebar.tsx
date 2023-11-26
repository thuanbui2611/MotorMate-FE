import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          {/* <img src={require("../assets/images/logo/logo.svg")} alt="Logo" /> */}
          <svg
            className="h-6 md:h-8"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            zoomAndPan="magnify"
            viewBox="0 0 1440 195.750001"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
          >
            <defs>
              <g />
              <clipPath id="1f3e23fe5e">
                <path
                  d="M 0.917969 8.707031 L 146.402344 8.707031 L 146.402344 186.996094 L 0.917969 186.996094 Z M 0.917969 8.707031 "
                  clipRule="nonzero"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#1f3e23fe5e)">
              <path
                fill="#ff7e06"
                d="M 64.785156 58.136719 C 66.636719 55.179688 69.917969 53.21875 73.660156 53.21875 C 77.402344 53.21875 80.683594 55.179688 82.535156 58.136719 L 87.667969 58.136719 C 89.601562 58.136719 91.160156 56.59375 91.160156 54.632812 C 91.160156 52.691406 89.5625 51.128906 87.667969 51.128906 L 85.859375 51.128906 L 91.390625 45.789062 L 96.5 47.078125 L 95.617188 50.578125 L 103.777344 52.605469 L 104.285156 50.578125 L 119.910156 54.484375 L 121.59375 47.667969 L 105.964844 43.761719 L 106.492188 41.714844 L 98.332031 39.667969 L 97.492188 43.046875 L 91.390625 41.566406 C 90.71875 41.421875 90.003906 41.609375 89.476562 42.074219 L 79.738281 51.128906 L 67.539062 51.128906 L 57.824219 42.074219 C 57.296875 41.609375 56.582031 41.421875 55.886719 41.566406 L 49.808594 43.023438 L 48.96875 39.667969 L 40.828125 41.714844 L 41.332031 43.761719 L 25.707031 47.667969 L 27.410156 54.484375 L 43.035156 50.578125 L 43.542969 52.605469 L 51.679688 50.578125 L 50.820312 47.078125 L 55.886719 45.789062 L 61.441406 51.128906 L 59.652344 51.128906 C 57.71875 51.128906 56.160156 52.667969 56.160156 54.632812 C 56.160156 56.574219 57.757812 58.136719 59.652344 58.136719 Z M 63.375 61.660156 L 52.667969 61.660156 L 52.667969 72.191406 L 56.160156 88.273438 L 56.160156 114.335938 L 61.753906 114.335938 L 61.753906 84.429688 C 63.226562 82.046875 66.488281 79.410156 73.660156 79.410156 C 80.8125 79.410156 84.070312 82.023438 85.566406 84.429688 L 85.566406 114.335938 L 91.160156 114.335938 L 91.160156 88.273438 L 94.652344 72.191406 L 94.652344 61.660156 L 83.945312 61.660156 C 84.09375 62.335938 84.15625 63.03125 84.15625 63.769531 C 84.15625 69.574219 79.464844 74.300781 73.660156 74.300781 C 67.855469 74.300781 63.164062 69.574219 63.164062 63.769531 C 63.164062 63.03125 63.226562 62.335938 63.375 61.660156 Z M 73.660156 186.996094 C 73.660156 186.996094 0.972656 146.246094 0.972656 81.644531 C 0.972656 41.355469 33.507812 8.707031 73.660156 8.707031 C 113.8125 8.707031 146.351562 41.355469 146.351562 81.644531 C 146.351562 146.246094 73.660156 186.996094 73.660156 186.996094 Z M 66.65625 93.230469 L 66.65625 135.417969 C 66.65625 139.238281 69.789062 142.425781 73.660156 142.425781 C 77.550781 142.425781 80.664062 139.28125 80.664062 135.417969 L 80.664062 93.230469 C 80.664062 89.410156 77.53125 86.246094 73.660156 86.246094 C 69.769531 86.246094 66.65625 89.371094 66.65625 93.230469 Z M 66.65625 93.230469 "
                fillOpacity="1"
                fillRule="evenodd"
              />
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(216.537035, 156.228964)">
                <g>
                  <path d="M 111.53125 0 L 111.21875 -52.171875 L 86.359375 -10.296875 L 69.34375 -10.296875 L 44.484375 -50.375 L 44.484375 0 L 9.328125 0 L 9.328125 -114.484375 L 41.046875 -114.484375 L 78.34375 -53.484375 L 114.640625 -114.484375 L 146.375 -114.484375 L 146.703125 0 Z M 111.53125 0 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(379.091854, 156.228964)">
                <g>
                  <path d="M 69.34375 2.609375 C 57.019531 2.609375 45.953125 0.0507812 36.140625 -5.0625 C 26.328125 -10.1875 18.640625 -17.300781 13.078125 -26.40625 C 7.523438 -35.507812 4.75 -45.785156 4.75 -57.234375 C 4.75 -68.679688 7.523438 -78.957031 13.078125 -88.0625 C 18.640625 -97.164062 26.328125 -104.28125 36.140625 -109.40625 C 45.953125 -114.53125 57.019531 -117.09375 69.34375 -117.09375 C 81.664062 -117.09375 92.734375 -114.53125 102.546875 -109.40625 C 112.359375 -104.28125 120.039062 -97.164062 125.59375 -88.0625 C 131.15625 -78.957031 133.9375 -68.679688 133.9375 -57.234375 C 133.9375 -45.785156 131.15625 -35.507812 125.59375 -26.40625 C 120.039062 -17.300781 112.359375 -10.1875 102.546875 -5.0625 C 92.734375 0.0507812 81.664062 2.609375 69.34375 2.609375 Z M 69.34375 -28.625 C 74.144531 -28.625 78.476562 -29.796875 82.34375 -32.140625 C 86.21875 -34.484375 89.296875 -37.804688 91.578125 -42.109375 C 93.867188 -46.421875 95.015625 -51.460938 95.015625 -57.234375 C 95.015625 -63.015625 93.867188 -68.054688 91.578125 -72.359375 C 89.296875 -76.671875 86.21875 -80 82.34375 -82.34375 C 78.476562 -84.6875 74.144531 -85.859375 69.34375 -85.859375 C 64.539062 -85.859375 60.203125 -84.6875 56.328125 -82.34375 C 52.460938 -80 49.382812 -76.671875 47.09375 -72.359375 C 44.8125 -68.054688 43.671875 -63.015625 43.671875 -57.234375 C 43.671875 -51.460938 44.8125 -46.421875 47.09375 -42.109375 C 49.382812 -37.804688 52.460938 -34.484375 56.328125 -32.140625 C 60.203125 -29.796875 64.539062 -28.625 69.34375 -28.625 Z M 69.34375 -28.625 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(524.311919, 156.228964)">
                <g>
                  <path d="M 34.1875 -84.546875 L 0.65625 -84.546875 L 0.65625 -114.484375 L 106.3125 -114.484375 L 106.3125 -84.546875 L 72.78125 -84.546875 L 72.78125 0 L 34.1875 0 Z M 34.1875 -84.546875 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(637.806105, 156.228964)">
                <g>
                  <path d="M 69.34375 2.609375 C 57.019531 2.609375 45.953125 0.0507812 36.140625 -5.0625 C 26.328125 -10.1875 18.640625 -17.300781 13.078125 -26.40625 C 7.523438 -35.507812 4.75 -45.785156 4.75 -57.234375 C 4.75 -68.679688 7.523438 -78.957031 13.078125 -88.0625 C 18.640625 -97.164062 26.328125 -104.28125 36.140625 -109.40625 C 45.953125 -114.53125 57.019531 -117.09375 69.34375 -117.09375 C 81.664062 -117.09375 92.734375 -114.53125 102.546875 -109.40625 C 112.359375 -104.28125 120.039062 -97.164062 125.59375 -88.0625 C 131.15625 -78.957031 133.9375 -68.679688 133.9375 -57.234375 C 133.9375 -45.785156 131.15625 -35.507812 125.59375 -26.40625 C 120.039062 -17.300781 112.359375 -10.1875 102.546875 -5.0625 C 92.734375 0.0507812 81.664062 2.609375 69.34375 2.609375 Z M 69.34375 -28.625 C 74.144531 -28.625 78.476562 -29.796875 82.34375 -32.140625 C 86.21875 -34.484375 89.296875 -37.804688 91.578125 -42.109375 C 93.867188 -46.421875 95.015625 -51.460938 95.015625 -57.234375 C 95.015625 -63.015625 93.867188 -68.054688 91.578125 -72.359375 C 89.296875 -76.671875 86.21875 -80 82.34375 -82.34375 C 78.476562 -84.6875 74.144531 -85.859375 69.34375 -85.859375 C 64.539062 -85.859375 60.203125 -84.6875 56.328125 -82.34375 C 52.460938 -80 49.382812 -76.671875 47.09375 -72.359375 C 44.8125 -68.054688 43.671875 -63.015625 43.671875 -57.234375 C 43.671875 -51.460938 44.8125 -46.421875 47.09375 -42.109375 C 49.382812 -37.804688 52.460938 -34.484375 56.328125 -32.140625 C 60.203125 -29.796875 64.539062 -28.625 69.34375 -28.625 Z M 69.34375 -28.625 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(783.026159, 156.228964)">
                <g>
                  <path d="M 58.390625 -28.78125 L 47.921875 -28.78125 L 47.921875 0 L 9.328125 0 L 9.328125 -114.484375 L 64.4375 -114.484375 C 75.007812 -114.484375 84.222656 -112.738281 92.078125 -109.25 C 99.929688 -105.757812 105.984375 -100.742188 110.234375 -94.203125 C 114.484375 -87.660156 116.609375 -80.03125 116.609375 -71.3125 C 116.609375 -63.132812 114.753906 -55.988281 111.046875 -49.875 C 107.335938 -43.769531 101.992188 -38.921875 95.015625 -35.328125 L 119.0625 0 L 77.84375 0 Z M 77.6875 -71.3125 C 77.6875 -75.5625 76.375 -78.859375 73.75 -81.203125 C 71.132812 -83.546875 67.210938 -84.71875 61.984375 -84.71875 L 47.921875 -84.71875 L 47.921875 -57.890625 L 61.984375 -57.890625 C 67.210938 -57.890625 71.132812 -59.0625 73.75 -61.40625 C 76.375 -63.75 77.6875 -67.050781 77.6875 -71.3125 Z M 77.6875 -71.3125 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(911.402038, 156.228964)">
                <g>
                  <path d="M 111.53125 0 L 111.21875 -52.171875 L 86.359375 -10.296875 L 69.34375 -10.296875 L 44.484375 -50.375 L 44.484375 0 L 9.328125 0 L 9.328125 -114.484375 L 41.046875 -114.484375 L 78.34375 -53.484375 L 114.640625 -114.484375 L 146.375 -114.484375 L 146.703125 0 Z M 111.53125 0 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(1073.956825, 156.228964)">
                <g>
                  <path d="M 87.328125 -19.953125 L 43.828125 -19.953125 L 36.140625 0 L -3.109375 0 L 46.9375 -114.484375 L 84.875 -114.484375 L 134.921875 0 L 95.015625 0 Z M 76.703125 -47.75 L 65.578125 -76.546875 L 54.46875 -47.75 Z M 76.703125 -47.75 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(1212.3084, 156.228964)">
                <g>
                  <path d="M 34.1875 -84.546875 L 0.65625 -84.546875 L 0.65625 -114.484375 L 106.3125 -114.484375 L 106.3125 -84.546875 L 72.78125 -84.546875 L 72.78125 0 L 34.1875 0 Z M 34.1875 -84.546875 " />
                </g>
              </g>
            </g>
            <g fill="#ff7e06" fillOpacity="1">
              <g transform="translate(1325.802586, 156.228964)">
                <g>
                  <path d="M 104.5 -29.109375 L 104.5 0 L 9.328125 0 L 9.328125 -114.484375 L 102.375 -114.484375 L 102.375 -85.375 L 47.265625 -85.375 L 47.265625 -71.953125 L 95.671875 -71.953125 L 95.671875 -44.15625 L 47.265625 -44.15625 L 47.265625 -29.109375 Z M 104.5 -29.109375 " />
                </g>
              </g>
            </g>
          </svg>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            {/* <!-- Menu Item Dashboard --> */}
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                      fill=""
                    />
                    <path
                      d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                      fill=""
                    />
                    <path
                      d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                      fill=""
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Management Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MANAGEMENT
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Products --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/brand" ||
                  pathname === "/collections" ||
                  pathname === "/model-vehicles" ||
                  pathname === "/colors"
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
                        ${
                          pathname === "/brand" ||
                          pathname === "/collections" ||
                          pathname === "/model-vehicles" ||
                          pathname === "/colors"
                            ? "bg-graydark dark:bg-meta-4"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex pr-1">
                          <div className="flex relative">
                            <svg
                              fill="#ffffff"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="20px"
                              height="20px"
                              viewBox="0 0 358.945 358.945"
                              xmlSpace="preserve"
                              stroke="#ffffff"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <g>
                                    <g>
                                      <path d="M307.633,172.984c-6.389,0-12.61,1.174-18.524,3.479l-2.822-4.597l33.765-4.5c0.456-0.063,11.241-1.459,12.688-9.508 c2.558-14.259-27.574-37.293-92.126-70.442c-5.915-2.747-10.227-4.086-13.181-4.086c-3.524,0-4.857,1.892-5.338,3.005 c-2.606,6.008,9.121,21.804,20.645,35.245c-12.677-6.737-33.339-15.783-52.885-15.783c-9.833,0-18.417,2.306-25.517,6.854 c-5.626,3.591-12.784,13.06-21.344,28.138c-0.375-0.597-0.987-1.015-1.684-1.132l-50.752-8.983l-7.071-21.227 c-0.282-0.864-1.009-1.486-1.907-1.672c-0.973-0.184-24.085-4.666-44.883-4.666c-22.902,0-35.218,5.338-36.62,15.853 c-3.278,24.761,99.893,57.601,121.84,64.294c-5.134,11.463-9.206,21.227-11.334,26.469c-6.395-21.432-26.667-36.74-49.146-36.74 c-28.286,0-51.314,23.031-51.314,51.332c0,28.288,23.028,51.299,51.314,51.299c22.638,0,42.763-15.084,49.164-36.756h121.27 c0.823,0,1.615-0.414,2.078-1.099l37.308-54.812l1.999,3.255c-10.778,9.733-16.939,23.574-16.939,38.106 c0,28.294,23.022,51.299,51.317,51.299s51.312-23.005,51.312-51.299C358.945,196.016,335.921,172.984,307.633,172.984z M292.639,132.17c0.985-1.36,2.9-2.054,5.717-2.054c1.934,0,4.257,0.324,6.917,0.981c20.903,15.165,23.089,22.71,22.536,25.875 c-0.78,4.398-8.305,5.419-8.395,5.425l-16.213,2.165C297.557,155.669,288.466,138.072,292.639,132.17z M93.274,219.038 c-0.459,0.589-1.198,0.942-1.96,0.942H54.924v13.859h34.735c0.834,0,1.625,0.414,2.083,1.135c0.469,0.696,0.556,1.598,0.21,2.359 c-5.233,12.244-17.219,20.158-30.522,20.158c-18.306,0-33.194-14.892-33.194-33.176c0-18.32,14.889-33.201,33.194-33.201 c15.574,0,28.85,10.617,32.33,25.797C93.938,217.669,93.76,218.443,93.274,219.038z M307.633,257.492 c-18.297,0-33.183-14.892-33.183-33.182c0-8.972,3.531-17.391,9.968-23.695c0.559-0.553,1.321-0.841,2.108-0.703 c0.708,0.091,1.387,0.523,1.789,1.172l14.352,23.322l7.302-4.491l-14.346-23.323c-0.384-0.637-0.48-1.435-0.228-2.161 c0.258-0.721,0.834-1.285,1.555-1.525c3.482-1.189,7.08-1.802,10.688-1.802c18.291,0,33.183,14.893,33.183,33.201 C340.81,242.601,325.917,257.492,307.633,257.492z"></path>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <svg
                              className="absolute -right-[10px]"
                              width={12}
                              height={12}
                              viewBox="0 0 1024 1024"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ffffff"
                              stroke="#ffffff"
                              strokeWidth="31.744"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  fill="#ffffff"
                                  d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                        Vehicle Config
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/brand"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (pathname === "/brand" && "!text-white")
                              }
                            >
                              Brand
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/collections"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Collections
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/model-vehicles"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Model
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/colors"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Colors
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Brand --> */}
              {/* <!-- Menu Item Vehicles --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/vehicles" || pathname.includes("vehicles")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 
                        ${
                          pathname === "/vehicles" ||
                          pathname.includes("vehicles/")
                            ? "bg-graydark dark:bg-meta-4"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          fill="#ffffff"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="20px"
                          height="20px"
                          viewBox="0 0 358.945 358.945"
                          xmlSpace="preserve"
                          stroke="#ffffff"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <g>
                                <g>
                                  <path d="M307.633,172.984c-6.389,0-12.61,1.174-18.524,3.479l-2.822-4.597l33.765-4.5c0.456-0.063,11.241-1.459,12.688-9.508 c2.558-14.259-27.574-37.293-92.126-70.442c-5.915-2.747-10.227-4.086-13.181-4.086c-3.524,0-4.857,1.892-5.338,3.005 c-2.606,6.008,9.121,21.804,20.645,35.245c-12.677-6.737-33.339-15.783-52.885-15.783c-9.833,0-18.417,2.306-25.517,6.854 c-5.626,3.591-12.784,13.06-21.344,28.138c-0.375-0.597-0.987-1.015-1.684-1.132l-50.752-8.983l-7.071-21.227 c-0.282-0.864-1.009-1.486-1.907-1.672c-0.973-0.184-24.085-4.666-44.883-4.666c-22.902,0-35.218,5.338-36.62,15.853 c-3.278,24.761,99.893,57.601,121.84,64.294c-5.134,11.463-9.206,21.227-11.334,26.469c-6.395-21.432-26.667-36.74-49.146-36.74 c-28.286,0-51.314,23.031-51.314,51.332c0,28.288,23.028,51.299,51.314,51.299c22.638,0,42.763-15.084,49.164-36.756h121.27 c0.823,0,1.615-0.414,2.078-1.099l37.308-54.812l1.999,3.255c-10.778,9.733-16.939,23.574-16.939,38.106 c0,28.294,23.022,51.299,51.317,51.299s51.312-23.005,51.312-51.299C358.945,196.016,335.921,172.984,307.633,172.984z M292.639,132.17c0.985-1.36,2.9-2.054,5.717-2.054c1.934,0,4.257,0.324,6.917,0.981c20.903,15.165,23.089,22.71,22.536,25.875 c-0.78,4.398-8.305,5.419-8.395,5.425l-16.213,2.165C297.557,155.669,288.466,138.072,292.639,132.17z M93.274,219.038 c-0.459,0.589-1.198,0.942-1.96,0.942H54.924v13.859h34.735c0.834,0,1.625,0.414,2.083,1.135c0.469,0.696,0.556,1.598,0.21,2.359 c-5.233,12.244-17.219,20.158-30.522,20.158c-18.306,0-33.194-14.892-33.194-33.176c0-18.32,14.889-33.201,33.194-33.201 c15.574,0,28.85,10.617,32.33,25.797C93.938,217.669,93.76,218.443,93.274,219.038z M307.633,257.492 c-18.297,0-33.183-14.892-33.183-33.182c0-8.972,3.531-17.391,9.968-23.695c0.559-0.553,1.321-0.841,2.108-0.703 c0.708,0.091,1.387,0.523,1.789,1.172l14.352,23.322l7.302-4.491l-14.346-23.323c-0.384-0.637-0.48-1.435-0.228-2.161 c0.258-0.721,0.834-1.285,1.555-1.525c3.482-1.189,7.08-1.802,10.688-1.802c18.291,0,33.183,14.893,33.183,33.201 C340.81,242.601,325.917,257.492,307.633,257.492z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        Vehicles
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/vehicles"
                              className={
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (pathname === "/vehicles" && "!text-white")
                              }
                            >
                              Approved
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/vehicles/pending"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Pending
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/vehicles/deny"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Deny
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Transaction --> */}
              <li>
                <NavLink
                  to="/transactions"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("transactions") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <img
                    className="h-5 w-5"
                    src={require("../assets/images/iconSideBar/transaction.png")}
                  />
                  Transactions
                </NavLink>
              </li>

              {/* <!-- Menu Item Profile --> */}
              {/* <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("profile") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Blog --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/blog" || pathname.includes("blog")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/blog" || pathname.includes("blog")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          stroke="#ffffff"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <defs>
                              <style>{`.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;strokeWidth:1.92px;}`}</style>
                            </defs>
                            <g id="roll_brush" data-name="roll brush">
                              <line
                                className="cls-1"
                                x1="5.24"
                                y1="11.08"
                                x2="18.66"
                                y2="11.08"
                              ></line>
                              <line
                                className="cls-1"
                                x1="5.24"
                                y1="18.76"
                                x2="18.66"
                                y2="18.76"
                              ></line>
                              <line
                                className="cls-1"
                                x1="5.24"
                                y1="14.92"
                                x2="18.66"
                                y2="14.92"
                              ></line>
                              <rect
                                className="cls-1"
                                x="1.4"
                                y="1.49"
                                width="21.1"
                                height="21.1"
                              ></rect>
                              <polygon
                                className="cls-1"
                                points="22.5 7.25 16.23 7.25 14.31 7.25 1.4 7.25 1.4 1.49 22.5 1.49 22.5 7.25"
                              ></polygon>
                              <line
                                className="cls-1"
                                x1="4.28"
                                y1="4.37"
                                x2="6.2"
                                y2="4.37"
                              ></line>
                              <line
                                className="cls-1"
                                x1="8.11"
                                y1="4.37"
                                x2="10.03"
                                y2="4.37"
                              ></line>
                              <line
                                className="cls-1"
                                x1="11.95"
                                y1="4.37"
                                x2="13.87"
                                y2="4.37"
                              ></line>
                            </g>
                          </g>
                        </svg>
                        Blog
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/blog"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (location.pathname === "/blog" && "!text-white")
                              }
                            >
                              Blog
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/blog/category"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Category
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item Settings --> */}
              {/* <li>
                <NavLink
                  to="/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9763)">
                      <path
                        d="M17.0721 7.30835C16.7909 6.99897 16.3971 6.83022 15.9752 6.83022H15.8909C15.7502 6.83022 15.6377 6.74585 15.6096 6.63335C15.5815 6.52085 15.5252 6.43647 15.4971 6.32397C15.4409 6.21147 15.4971 6.09897 15.5815 6.0146L15.6377 5.95835C15.9471 5.6771 16.1159 5.28335 16.1159 4.86147C16.1159 4.4396 15.9752 4.04585 15.6659 3.73647L14.569 2.61147C13.9784 1.99272 12.9659 1.9646 12.3471 2.58335L12.2627 2.6396C12.1784 2.72397 12.0377 2.7521 11.8971 2.69585C11.7846 2.6396 11.6721 2.58335 11.5315 2.55522C11.3909 2.49897 11.3065 2.38647 11.3065 2.27397V2.13335C11.3065 1.26147 10.6034 0.55835 9.73148 0.55835H8.15648C7.7346 0.55835 7.34085 0.7271 7.0596 1.00835C6.75023 1.31772 6.6096 1.71147 6.6096 2.10522V2.21772C6.6096 2.33022 6.52523 2.44272 6.41273 2.49897C6.35648 2.5271 6.32835 2.5271 6.2721 2.55522C6.1596 2.61147 6.01898 2.58335 5.9346 2.49897L5.87835 2.4146C5.5971 2.10522 5.20335 1.93647 4.78148 1.93647C4.3596 1.93647 3.96585 2.0771 3.65648 2.38647L2.53148 3.48335C1.91273 4.07397 1.8846 5.08647 2.50335 5.70522L2.5596 5.7896C2.64398 5.87397 2.6721 6.0146 2.61585 6.09897C2.5596 6.21147 2.53148 6.29585 2.47523 6.40835C2.41898 6.52085 2.3346 6.5771 2.19398 6.5771H2.1096C1.68773 6.5771 1.29398 6.71772 0.984604 7.0271C0.675229 7.30835 0.506479 7.7021 0.506479 8.12397L0.478354 9.69897C0.450229 10.5708 1.15335 11.274 2.02523 11.3021H2.1096C2.25023 11.3021 2.36273 11.3865 2.39085 11.499C2.4471 11.5833 2.50335 11.6677 2.53148 11.7802C2.5596 11.8927 2.53148 12.0052 2.4471 12.0896L2.39085 12.1458C2.08148 12.4271 1.91273 12.8208 1.91273 13.2427C1.91273 13.6646 2.05335 14.0583 2.36273 14.3677L3.4596 15.4927C4.05023 16.1115 5.06273 16.1396 5.68148 15.5208L5.76585 15.4646C5.85023 15.3802 5.99085 15.3521 6.13148 15.4083C6.24398 15.4646 6.35648 15.5208 6.4971 15.549C6.63773 15.6052 6.7221 15.7177 6.7221 15.8302V15.9427C6.7221 16.8146 7.42523 17.5177 8.2971 17.5177H9.8721C10.744 17.5177 11.4471 16.8146 11.4471 15.9427V15.8302C11.4471 15.7177 11.5315 15.6052 11.644 15.549C11.7002 15.5208 11.7284 15.5208 11.7846 15.4927C11.9252 15.4365 12.0377 15.4646 12.1221 15.549L12.1784 15.6333C12.4596 15.9427 12.8534 16.1115 13.2752 16.1115C13.6971 16.1115 14.0909 15.9708 14.4002 15.6615L15.5252 14.5646C16.144 13.974 16.1721 12.9615 15.5534 12.3427L15.4971 12.2583C15.4127 12.174 15.3846 12.0333 15.4409 11.949C15.4971 11.8365 15.5252 11.7521 15.5815 11.6396C15.6377 11.5271 15.7502 11.4708 15.8627 11.4708H15.9471H15.9752C16.819 11.4708 17.5221 10.7958 17.5502 9.92397L17.5784 8.34897C17.5221 8.01147 17.3534 7.5896 17.0721 7.30835ZM16.2284 9.9521C16.2284 10.1208 16.0877 10.2615 15.919 10.2615H15.8346H15.8065C15.1596 10.2615 14.569 10.6552 14.344 11.2177C14.3159 11.3021 14.2596 11.3865 14.2315 11.4708C13.9784 12.0333 14.0909 12.7365 14.5409 13.1865L14.5971 13.2708C14.7096 13.3833 14.7096 13.5802 14.5971 13.6927L13.4721 14.7896C13.3877 14.874 13.3034 14.874 13.2471 14.874C13.1909 14.874 13.1065 14.874 13.0221 14.7896L12.9659 14.7052C12.5159 14.2271 11.8409 14.0865 11.2221 14.3677L11.1096 14.424C10.4909 14.6771 10.0971 15.2396 10.0971 15.8865V15.999C10.0971 16.1677 9.95648 16.3083 9.78773 16.3083H8.21273C8.04398 16.3083 7.90335 16.1677 7.90335 15.999V15.8865C7.90335 15.2396 7.5096 14.649 6.89085 14.424C6.80648 14.3958 6.69398 14.3396 6.6096 14.3115C6.3846 14.199 6.1596 14.1708 5.9346 14.1708C5.54085 14.1708 5.1471 14.3115 4.83773 14.6208L4.78148 14.649C4.66898 14.7615 4.4721 14.7615 4.3596 14.649L3.26273 13.524C3.17835 13.4396 3.17835 13.3552 3.17835 13.299C3.17835 13.2427 3.17835 13.1583 3.26273 13.074L3.31898 13.0177C3.7971 12.5677 3.93773 11.8646 3.6846 11.3021C3.65648 11.2177 3.62835 11.1333 3.5721 11.049C3.3471 10.4583 2.7846 10.0365 2.13773 10.0365H2.05335C1.8846 10.0365 1.74398 9.89585 1.74398 9.7271L1.7721 8.1521C1.7721 8.0396 1.82835 7.98335 1.85648 7.9271C1.8846 7.89897 1.96898 7.84272 2.08148 7.84272H2.16585C2.81273 7.87085 3.40335 7.4771 3.65648 6.88647C3.6846 6.8021 3.74085 6.71772 3.76898 6.63335C4.0221 6.07085 3.9096 5.36772 3.4596 4.91772L3.40335 4.83335C3.29085 4.72085 3.29085 4.52397 3.40335 4.41147L4.52835 3.3146C4.61273 3.23022 4.6971 3.23022 4.75335 3.23022C4.8096 3.23022 4.89398 3.23022 4.97835 3.3146L5.0346 3.39897C5.4846 3.8771 6.1596 4.01772 6.77835 3.7646L6.89085 3.70835C7.5096 3.45522 7.90335 2.89272 7.90335 2.24585V2.13335C7.90335 2.02085 7.9596 1.9646 7.98773 1.90835C8.01585 1.8521 8.10023 1.82397 8.21273 1.82397H9.78773C9.95648 1.82397 10.0971 1.9646 10.0971 2.13335V2.24585C10.0971 2.89272 10.4909 3.48335 11.1096 3.70835C11.194 3.73647 11.3065 3.79272 11.3909 3.82085C11.9815 4.1021 12.6846 3.9896 13.1627 3.5396L13.2471 3.48335C13.3596 3.37085 13.5565 3.37085 13.669 3.48335L14.7659 4.60835C14.8502 4.69272 14.8502 4.7771 14.8502 4.83335C14.8502 4.8896 14.8221 4.97397 14.7659 5.05835L14.7096 5.1146C14.2034 5.53647 14.0627 6.2396 14.2877 6.8021C14.3159 6.88647 14.344 6.97085 14.4002 7.05522C14.6252 7.64585 15.1877 8.06772 15.8346 8.06772H15.919C16.0315 8.06772 16.0877 8.12397 16.144 8.1521C16.2002 8.18022 16.2284 8.2646 16.2284 8.3771V9.9521Z"
                        fill=""
                      />
                      <path
                        d="M9.00029 5.22705C6.89092 5.22705 5.17529 6.94268 5.17529 9.05205C5.17529 11.1614 6.89092 12.8771 9.00029 12.8771C11.1097 12.8771 12.8253 11.1614 12.8253 9.05205C12.8253 6.94268 11.1097 5.22705 9.00029 5.22705ZM9.00029 11.6114C7.59404 11.6114 6.44092 10.4583 6.44092 9.05205C6.44092 7.6458 7.59404 6.49268 9.00029 6.49268C10.4065 6.49268 11.5597 7.6458 11.5597 9.05205C11.5597 10.4583 10.4065 11.6114 9.00029 11.6114Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9763">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Settings
                </NavLink>
              </li> */}
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Users --> */}
              <li>
                <NavLink
                  to="/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M1.5 6.5C1.5 3.46243 3.96243 1 7 1C10.0376 1 12.5 3.46243 12.5 6.5C12.5 9.53757 10.0376 12 7 12C3.96243 12 1.5 9.53757 1.5 6.5Z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M14.4999 6.5C14.4999 8.00034 14.0593 9.39779 13.3005 10.57C14.2774 11.4585 15.5754 12 16.9999 12C20.0375 12 22.4999 9.53757 22.4999 6.5C22.4999 3.46243 20.0375 1 16.9999 1C15.5754 1 14.2774 1.54153 13.3005 2.42996C14.0593 3.60221 14.4999 4.99966 14.4999 6.5Z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M0 18C0 15.7909 1.79086 14 4 14H10C12.2091 14 14 15.7909 14 18V22C14 22.5523 13.5523 23 13 23H1C0.447716 23 0 22.5523 0 22V18Z"
                        fill="#ffffff"
                      ></path>
                      <path
                        d="M16 18V23H23C23.5522 23 24 22.5523 24 22V18C24 15.7909 22.2091 14 20 14H14.4722C15.4222 15.0615 16 16.4633 16 18Z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </svg>
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

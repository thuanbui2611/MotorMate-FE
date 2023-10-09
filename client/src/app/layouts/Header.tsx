import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";

import { signOut } from "../../pages/account/AccountSlice";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MenuItemUser from "../components/MenuItemUser";
interface Props {}
export default function Header(props: Props) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const triggerMobileMenu = useRef<any>(null);
  const dropdownMobileMenu = useRef<any>(null);
  const user = useAppSelector((state) => state.account.userDetail);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width exceeds the mobile threshold (e.g., 768px)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false); // Reset the mobile menu state to false
      }
    };
    // Add a resize event listener to monitor window width changes
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //for mobileMenu
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownMobileMenu.current) return;
      if (
        !isMobileMenuOpen ||
        dropdownMobileMenu.current.contains(target) ||
        triggerMobileMenu.current.contains(target)
      )
        return;
      setIsMobileMenuOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isMobileMenuOpen || keyCode !== 27) return;
      setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <nav className=" bg-color-header border-1 border-white shadow-black shadow-inner ">
      <div className=" max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center justify-center">
          <svg
            className="h-5 md:h-10"
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
        </Link>

        <div className="flex items-center md:order-2">
          {user ? (
            <MenuItemUser user={user} />
          ) : (
            <>
              <a className="button-login" href="/login">
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">Login</span>
                </span>
              </a>
            </>
          )}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            type="button"
            className={` ${
              isMobileMenuOpen ? "bg-gray-50" : ""
            } inline-flex items-center p-1 ml-1 text-sm text-gray-500 rounded-md md:hidden`}
            ref={triggerMobileMenu}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={` items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "list-menu" : "hidden"
          }`}
          ref={dropdownMobileMenu}
        >
          <ul className="flex flex-col w-fit p-1 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "md:text-orange-based"
                    : "md:text-white"
                } block header-items py-2 pl-3 pr-4 text-black rounded-md hover:bg-orange-based md:hover:bg-transparent md:p-0  md:hover:text-orange-based md:px-4 md:py-2`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about"
                    ? "md:text-orange-based"
                    : "md:text-white"
                } block header-items py-2 pl-3 pr-4 text-black rounded-md hover:bg-orange-based md:hover:bg-transparent md:p-0  md:hover:text-orange-based md:px-4 md:py-2`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`${
                  location.pathname === "/products"
                    ? "md:text-orange-based"
                    : "md:text-white"
                } block header-items py-2 pl-3 pr-4 text-black rounded-md hover:bg-orange-based md:hover:bg-transparent md:p-0  md:hover:text-orange-based md:px-4 md:py-2`}
              >
                Rent Motorcycles
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`${
                  location.pathname === "/blog"
                    ? "md:text-orange-based"
                    : "md:text-white"
                } block header-items py-2 pl-3 pr-4 text-black rounded-md hover:bg-orange-based md:hover:bg-transparent md:p-0  md:hover:text-orange-based md:px-4 md:py-2`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${
                  location.pathname === "/contact"
                    ? "md:text-orange-based"
                    : "md:text-white"
                } block header-items py-2 pl-3 pr-4 text-black rounded-md hover:bg-orange-based md:hover:bg-transparent md:p-0  md:hover:text-orange-based md:px-4 md:py-2`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

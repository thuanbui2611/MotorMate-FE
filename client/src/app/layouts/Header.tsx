import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import jwt_decode from "jwt-decode";
import {
  fetchUserFromToken,
  signOut,
} from "../../features/account/AccountSlice";
interface Props {}
export default function Header(props: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.account.user);
  return (
    <nav className="bg-black border-1 border-white shadow-white shadow-inner">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="/favicon.ico" className="h-8 mr-3" alt="MotorMate Logo" />
          <span className=" text-white self-center text-2xl font-semibold whitespace-nowrap ">
            MotorMate
          </span>
        </a>
        {/* Search */}
        {/* <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for a keyword, title, abstract, author, ISSN, ISBN"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form> */}
        <div className="flex items-center md:order-2">
          {user ? (
            <>
              <li className="font-sans block lg:inline-block mr-4 pt-1 lg:mt-0 lg:ml-6 text-black hover:text-gray-700">
                <a href="/my-cart" role="button" className="relative flex">
                  <svg
                    className="flex-1 w-8 h-8 fill-current text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                  </svg>
                  <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    5
                  </span>
                </a>
              </li>
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-toggle="dropdown"
                data-dropdown-placement="bottom"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=2000"
                  alt="user photo"
                />
              </button>
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 font-bold">
                    {user?.name}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate">
                    {user?.role}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/your-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile-setting"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => dispatch(signOut())}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <a className="text-white" href="/login">
                Login
              </a>
            </>
          )}
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <svg
              className="w-6 h-6"
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
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent ">
            <li>
              <a
                href="/"
                className="block py-2 pl-3 pr-4 text-black rounded font-bold shadow-md hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:text-white md:hover:bg-orange-based md:px-4 md:py-2"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 pl-3 pr-4 text-black rounded font-bold shadow-md hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:text-white md:hover:bg-orange-based md:px-4 md:py-2"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="block py-2 pl-3 pr-4 text-black rounded font-bold shadow-md hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:text-white md:hover:bg-orange-based md:px-4 md:py-2"
              >
                Rent Motorcycles
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="block py-2 pl-3 pr-4 text-black rounded font-bold shadow-md hover:bg-gray-100 md:hover:bg-transparent md:p-0 md:text-white md:hover:bg-orange-based md:px-4 md:py-2"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

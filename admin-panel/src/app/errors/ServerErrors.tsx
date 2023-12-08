import { Link } from "react-router-dom";

export default function ServerErrors() {
  return (
    <>
      <div className="flex h-screen items-center justify-center p-5 w-full bg-white">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-red-100 p-4">
            <div className="rounded-full stroke-red-600 bg-red-200 p-4">
              <svg
                className="w-16 h-16"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M17 16L22 21M22 16L17 21"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
            500 - Server error
          </h1>
          <p className="text-slate-600 mt-5 lg:text-lg mb-5">
            Oops something went wrong. Try to refresh this page or <br /> feel
            free to contact us if the problem presists.
          </p>
          <Link
            to="/"
            className="rounded-full py-1 px-2 bg-gradient-to-r from-[#FF6003] to-[#FF7E06] font-medium text-white hover:brightness-90 transition-all duration-200"
          >
            Back to Home page
          </Link>
        </div>
      </div>
    </>
  );
}

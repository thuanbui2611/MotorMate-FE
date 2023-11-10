import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export default function BlogComment() {
  return (
    <>
      <div className="py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-full space-y-8">
          <div className="flex justify-start items-start">
            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
              Comments (69)
            </p>
          </div>
          {/* comment form  */}
          <div className="w-full flex justify-start items-start">
            <div>
              <img
                src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                alt="user-avatar"
                className=""
              />
            </div>
            <div className="w-full flex justify-start items-start flex-col bg-gray-200/50 ml-2 rounded-2xl p-4">
              <form className="flex items-center justify-center w-full">
                <TextField
                  className="w-full px-4 py-3 bg-transparent rounded-lg border-none"
                  multiline
                  sx={{
                    "& fieldset": { border: "none" },
                    "&:hover": {
                      outline: "none",
                    },
                    "&:active": {
                      outline: "none",
                    },
                  }}
                  placeholder="Write your comment"
                  maxRows={3}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      outline: "none",
                      boxShadow: "none",
                    },
                    inputProps: { "data-gramm": "false" },
                  }}
                />

                <button
                  className="flex ml-3 text-white justify-center items-center h-8 w-8 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear
                                after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-color-header hover:after:opacity-100 hover:after:scale-[2.5]  bg-gradient-to-r from-[#FF6003] to-[#FF7E06] border-transparent hover:border-[#172554]"
                >
                  <span className="flex relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          {/* Comment Start */}
          <div className="w-full flex justify-start items-start flex-col bg-gray-50">
            <div className="flex mx-10">
              <div>
                <img
                  src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                  alt="user-avatar"
                  className=""
                />
              </div>
              <div className="w-full flex justify-start items-start flex-col bg-gray-200/50 ml-2 rounded-2xl p-4">
                <div className="flex w-full justify-between items-start">
                  <p className="text-base leading-none text-black font-bold">
                    Anna Kendrick
                  </p>
                  <p className="text-sm leading-none text-black ">
                    14 July 2021
                  </p>
                </div>
                <div className="md:block">
                  <p className="mt-3 text-xs md:text-sm font-medium text-black w-full">
                    This style relies more on neutral colors with little to no
                    embellishment on furniture. Lighter fabrics, such as silk
                    and cotton, are popular, as are lighter colors in wood and
                    metal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-start items-start flex-col bg-gray-50">
            <div className="flex mx-10">
              <div>
                <img
                  src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                  alt="user-avatar"
                  className=""
                />
              </div>
              <div className="w-full flex justify-start items-start flex-col bg-gray-200/50 ml-2 rounded-2xl p-4">
                <div className="flex w-full justify-between items-start">
                  <p className="text-base leading-none text-black font-bold">
                    Anna Kendrick
                  </p>
                  <p className="text-sm leading-none text-black ">
                    14 July 2021
                  </p>
                </div>
                <div className="md:block">
                  <p className="mt-3 text-xs md:text-sm font-medium text-black w-full">
                    This style relies more on neutral colors with little to no
                    embellishment on furniture.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Review End */}
          <p className="mx-auto text-blue-500 hover:text-blue-700 cursor-pointer text-sm lg:text-base border border-blue-500 rounded-xl px-2 hover:bg-blue-400">
            See more
          </p>
        </div>
      </div>
    </>
  );
}

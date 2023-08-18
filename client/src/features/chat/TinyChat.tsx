import { useState } from "react";

export default function TinyChat() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormClosing, setIsFormClosing] = useState(false);

  const handleIconClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseClick = () => {
    setIsFormClosing(true);
    setTimeout(() => {
      setIsFormVisible(false);
      setIsFormClosing(false);
    }, 450);
  };
  return (
    <>
      {!isFormVisible && (
        <div className="fixed bottom-0 right-0 p-5">
          <button className="chatBtn" onClick={handleIconClick}>
            <svg
              height="1.6em"
              fill="white"
              viewBox="0 0 1000 1000"
              y="0px"
              x="0px"
              version="1.1"
            >
              <path d="M881.1,720.5H434.7L173.3,941V720.5h-54.4C58.8,720.5,10,671.1,10,610.2v-441C10,108.4,58.8,59,118.9,59h762.2C941.2,59,990,108.4,990,169.3v441C990,671.1,941.2,720.5,881.1,720.5L881.1,720.5z M935.6,169.3c0-30.4-24.4-55.2-54.5-55.2H118.9c-30.1,0-54.5,24.7-54.5,55.2v441c0,30.4,24.4,55.1,54.5,55.1h54.4h54.4v110.3l163.3-110.2H500h381.1c30.1,0,54.5-24.7,54.5-55.1V169.3L935.6,169.3z M717.8,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.5,24.7,54.5,55.2C772.2,420.2,747.8,444.8,717.8,444.8L717.8,444.8z M500,444.8c-30.1,0-54.4-24.7-54.4-55.1c0-30.4,24.3-55.2,54.4-55.2c30.1,0,54.4,24.7,54.4,55.2C554.4,420.2,530.1,444.8,500,444.8L500,444.8z M282.2,444.8c-30.1,0-54.5-24.7-54.5-55.1c0-30.4,24.4-55.2,54.5-55.2c30.1,0,54.4,24.7,54.4,55.2C336.7,420.2,312.3,444.8,282.2,444.8L282.2,444.8z"></path>
            </svg>
            <span className="tooltip">Chat</span>
          </button>
        </div>
      )}

      {isFormVisible && (
        <div
          className={`container mx-auto rounded-lg border-2 md:w-1/3 md:max-h-96 md:max-w-lg fixed bottom-0 right-0 2 z-50 py-1 bg-white
        ${isFormClosing ? "animate-fade-out" : "animate-fade-in"}
          `}
        >
          <div
            className="flex justify-between items-center bg-white border-b-2"
            style={{ fontSize: "0.8rem;" }}
          >
            <div className=" text-center" style={{ width: "40%" }}>
              <p className="font-semibold text-xl">Chat</p>
            </div>
            <div
              className="flex justify-between items-center bg-blue-500 p-2 h-full rounded-lg -mt-1 "
              style={{ width: "61%" }}
            >
              <div className="flex-row flex-initial items-center">
                <div className="h-6 w-6 p-1 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                  J
                </div>
                <p className="flex-initial ml-2 text-white"> James</p>
              </div>
              <div className="flex-row flex-initial items-center">
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between bg-white max-h-80 ">
            <div className="flex flex-col w-2/3 border-r-2 overflow-y-auto max-h-80 scrollbar ">
              <div className="border-b-2 py-2 px-1 h-11 sticky top-0 bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  className="py-1 px-1 border-2 border-gray-200 rounded-xl w-full text-center h-full text-xs"
                />
              </div>
              {/* All message */}
              <div className="flex flex-row py-2 px-1 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Luis1994
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Pick me at 9:00 AM brooooooo
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Everest Trip 2021
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Hi Sam, Welcome
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Luis1994
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Pick me at 9:00 AM brooooooo
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Everest Trip 2021
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Hi Sam, Welcome
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Luis1994
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Pick me at 9:00 AM brooooooo
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Everest Trip 2021
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Hi Sam, Welcome
                  </span>
                </div>
              </div>
              <div className="flex flex-row py-2 px-1 items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Everest Trip 2021
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Hi Sam, Welcome
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 justify-center items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Luis1994
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Pick me at 9:00 AM brooooooo
                  </span>
                </div>
              </div>

              <div className="flex flex-row py-2 px-1 items-center border-b-2">
                <div className="w-1/4">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="w-3/4">
                  <div className="flex justify-between">
                    <div className="flex-row flex-initial text-sm font-semibold line-clamp-1">
                      Everest Trip 2021
                    </div>
                    <div className=" flex-row flex-initial text-xs font-semibold justify-end text-gray-500">
                      {" "}
                      Today
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs line-clamp-1">
                    Hi Sam, Welcome
                  </span>
                </div>
              </div>
              {/* End of all message */}
            </div>

            <div className="w-full flex flex-col justify-between flex-grow overflow-y-auto max-h-80 scrollbar ">
              <div className="flex flex-col mt-2 px-1">
                {/* Start detail message */}
                {/* Message sending */}
                <div className="flex justify-end mb-1 ml-10">
                  <div className="mr-1 py-2 px-3 bg-blue-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                    Welcome to group everyone!
                  </div>
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                </div>
                {/* Message recieving */}
                {/* Message sending */}
                <div className="flex justify-end mb-1 ml-10">
                  <div className="mr-1 py-2 px-3 bg-blue-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                    Welcome to group everyone!
                  </div>
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                </div>
                {/* Message recieving */}
                <div className="flex justify-start mb-1 mr-10">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                  <div className="ml-1 py-2 px-3 bg-gray-200 rounded-br-2xl rounded-tr-2xl rounded-tl-lg text-black text-sm">
                    happy holiday guys! happy holiday guys!happy holiday
                    guys!happy holiday guys!happy holiday guys! happy holiday
                    guys! happy holiday guys! happy holiday guys!
                  </div>
                </div>
                {/* Message sending */}
                <div className="flex justify-end mb-1 ml-10">
                  <div className="mr-1 py-2 px-3 bg-blue-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                    Welcome to group everyone!
                  </div>
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                </div>
                {/* Message recieving */}
                <div className="flex justify-start mb-1 mr-10">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                  <div className="ml-1 py-2 px-3 bg-gray-200 rounded-br-2xl rounded-tr-2xl rounded-tl-lg text-black text-sm">
                    happy holiday guys! happy holiday guys!happy holiday
                    guys!happy holiday guys!happy holiday guys! happy holiday
                    guys! happy holiday guys! happy holiday guys!
                  </div>
                </div>
                {/* Message sending */}
                <div className="flex justify-end mb-1 ml-10">
                  <div className="mr-1 py-2 px-3 bg-blue-500 rounded-bl-2xl rounded-tl-2xl rounded-tr-lg text-white text-sm">
                    Welcome to group everyone!
                  </div>
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                </div>
                {/* Message recieving */}
                <div className="flex justify-start mb-1 mr-10">
                  <img
                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                    className="object-cover h-6 w-6 rounded-full"
                    alt=""
                  />
                  <div className="ml-1 py-2 px-3 bg-gray-200 rounded-br-2xl rounded-tr-2xl rounded-tl-lg text-black text-sm">
                    happy holiday guys! happy holiday guys!happy holiday
                    guys!happy holiday guys!happy holiday guys! happy holiday
                    guys! happy holiday guys! happy holiday guys!
                  </div>
                </div>
                {/* End detail message */}
              </div>
              <div className="flex py-2 items-center bg-white sticky bottom-0">
                <input
                  className="bg-white py-2 px-1 rounded-lg flex-grow text-xs"
                  style={{ width: "93%" }}
                  type="text"
                  placeholder="Type your message here..."
                />
                <button className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center ml-1">
                  <svg
                    className="w-3 h-3 rotate-45 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                    style={{ width: "12px", height: "12px" }}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

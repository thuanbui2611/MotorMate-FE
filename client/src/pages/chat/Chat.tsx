export default function Chat() {
  return (
    <>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">GoingChat</div>
          <div className="w-1/2 flex items-center">
            <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              J
            </div>
            <p className="ml-3"> James</p>
          </div>
          <div></div>
        </div>

        <div className="flex flex-row justify-between bg-white h-full">
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            <div className="border-b-2 py-4 px-2">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>

            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Luis1994</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>

            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/otT2199XwI8/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Everest Trip 2021</div>
                <span className="text-gray-500">Hi Sam, Welcome</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">MERN Stack</div>
                <span className="text-gray-500">Lusi : Thanks Everyone</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">
                  Javascript Indonesia
                </div>
                <span className="text-gray-500">
                  Evan : some one can fix this
                </span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">
                  Javascript Indonesia
                </div>
                <span className="text-gray-500">
                  Evan : some one can fix this
                </span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">
                  Javascript Indonesia
                </div>
                <span className="text-gray-500">
                  Evan : some one can fix this
                </span>
              </div>
            </div>
          </div>

          <div className="w-full px-5 flex flex-col justify-between flex-grow">
            <div className="flex flex-col mt-5">
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
                  Architecto nulla doloribus laborum illo rem enim dolor odio
                  saepe, consequatur quas?
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div>
                  <div className="mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magnam, repudiandae.
                  </div>

                  <div className="mt-4 mr-2 py-3 px-4 bg-blue-500 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Debitis, reiciendis!
                  </div>
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                  happy holiday guys!
                </div>
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                  happy holiday guys!
                </div>
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                  happy holiday guys!
                </div>
              </div>
            </div>
            <div className="flex py-5 items-center">
              <input
                className="bg-white py-5 px-3 rounded-xl flex-grow"
                style={{ width: "93%" }}
                type="text"
                placeholder="Type your message here..."
              />
              <button className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center ml-3">
                <svg
                  className="w-6 h-6 rotate-45 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
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
    </>
  );
}

import { useNavigate } from "react-router-dom";

export default function ShopOrders() {
  const data = ["1", "2", "3", "4", "5"];
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-center pb-6">
          <div>
            <h2 className="mb-4 text-2xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-gradient">
              Shop Orders
            </h2>
          </div>
        </div>
        <div className="flex bg-gray-50 items-center p-2 w-fit rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="bg-gray-50 outline-none ml-1 block "
            type="text"
            name=""
            id=""
            placeholder="search..."
          />
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Order Tag
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Customers
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Rent date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Order date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Total price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      className=" cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate("/my-orders/1")}
                    >
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div> */}
                          <div className="ml-3">
                            <p className="text-blue-500 font-bold whitespace-no-wrap">
                              #123
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-black font-semibold whitespace-no-wrap">
                          thuanbcgcs200424
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-black font-semibold whitespace-no-wrap">
                          10/10/2023 - 13/10/2023
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-black font-semibold whitespace-no-wrap">
                          13/10/2023
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-black font-semibold whitespace-no-wrap">
                          300.000 VND
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-blue-200  rounded-full"
                          ></span>
                          <span className="relative">Pending</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

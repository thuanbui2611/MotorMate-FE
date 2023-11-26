import { useNavigate, useSearchParams } from "react-router-dom";
import { ParentOrder } from "../../app/models/TripRequest";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import {
  getTransactionsAsync,
  setTransactionParams,
  transactionSelectors,
} from "./TransactionSlice";
import Loader from "../../app/components/Loader";
import Breadcrumb from "../../app/components/Breadcrumb";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import SelectPageSize from "../../app/components/SelectPageSize";
import LoaderButton from "../../app/components/LoaderButton";
import Pagination from "../../app/components/Pagination";

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("All");

  const transactions = useAppSelector(transactionSelectors.selectAll);
  const { transactionLoaded, metaData, transactionParams } = useAppSelector(
    (state) => state.transaction
  );
  const statusOrders: string[] = [
    "All",
    "Pending",
    "On Going",
    "Canceled",
    "Completed",
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //Get params value from url
  const pageNum = searchParams.get("pageNumber");
  const searchQueryParam = searchParams.get("SearchQuery");
  const statusParam = searchParams.get("Status");

  useEffect(() => {
    if (pageNum === "1") {
      setSearchParams((prev) => {
        prev.delete("pageNumber");
        return prev;
      });
      dispatch(setTransactionParams({ pageNumber: 1 }));
    } else if (pageNum) {
      dispatch(setTransactionParams({ pageNumber: +pageNum }));
    }
  }, [pageNum, dispatch]);
  //End of get valueFilter from url params and set selected

  useEffect(() => {
    if (searchQueryParam) {
      const querySearch = searchQueryParam.trim();
      setSearchQuery(querySearch);
      dispatch(setTransactionParams({ SearchQuery: querySearch }));
    } else {
      dispatch(setTransactionParams({ SearchQuery: undefined }));
    }
  }, [searchQueryParam, dispatch]);

  useEffect(() => {
    if (statusParam) {
      const status = statusParam.trim();
      setSelectedStatus(status);
      dispatch(setTransactionParams({ Status: status }));
    } else {
      dispatch(setTransactionParams({ Status: undefined }));
    }
  }, [statusParam, dispatch]);

  const handleSelectedStatus = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string | null
  ) => {
    if (!newValue) return;
    if (newValue === "All") {
      setSelectedStatus("All");
      setSearchParams((prev) => {
        prev.delete("Status");
        return prev;
      });
    } else {
      setSelectedStatus(newValue);
      setSearchParams((prev) => {
        prev.set("Status", newValue);
        return prev;
      });
    }
  };
  // End of handle change filter

  const handleSearch = () => {
    if (searchQuery) {
      setSearchParams((prev) => {
        prev.set("SearchQuery", searchQuery.trim());
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("SearchQuery");
        return prev;
      });
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  // End of filter

  useEffect(() => {
    if (!transactionLoaded) {
      dispatch(getTransactionsAsync());
    }
  }, [dispatch, transactionParams]);

  const handleSelectPageSize = (pageSize: number) => {
    dispatch(setTransactionParams({ pageSize }));
  };

  return !metaData ? (
    <Loader />
  ) : (
    <>
      <Breadcrumb pageName="Transaction" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between mb-5">
          <div className="flex items-center ml-2">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="w-full">
              <input
                type="text"
                className="bg-white dark:bg-blue-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search order tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
          <Autocomplete
            className="bg-white rounded-md dark:bg-blue-gray-50"
            sx={{
              width: "125px",
              "& .MuiOutlinedInput-root": {
                paddingRight: "20px!important",
              },
            }}
            size="small"
            disablePortal
            value={selectedStatus}
            options={statusOrders}
            onChange={(event, newValue) =>
              handleSelectedStatus(event, newValue)
            }
            renderInput={(params) => <TextField {...params} />}
            clearIcon={null}
          />
        </div>
        <div className="max-w-full overflow-x-auto scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className=" bg-gray-2 text-left dark:bg-meta-4  font-bold">
                <th className="min-w-[150px] py-4 px-4 text-black dark:text-white">
                  Order Tag
                </th>
                <th className="min-w-[150px] py-4 px-4 text-black dark:text-white">
                  Lessor
                </th>
                <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                  Lessee
                </th>
                <th className="py-4 px-4 text-black dark:text-white text-center">
                  Number of <br /> Vehicles
                </th>
                <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                  Profit
                </th>
                <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                  Order Date
                </th>
                <th className="min-w-[100px] py-4 pl-4 text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 pr-4 w-fit">
                  <SelectPageSize onSelectPageSize={handleSelectPageSize} />
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionLoaded ? (
                <tr>
                  <td colSpan={9}>
                    <div className="flex justify-center items-center w-full h-20">
                      <LoaderButton />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="flex justify-center items-center w-full h-20">
                          <p className="text-black dark:text-white">
                            No Items Found.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => (
                      <tr
                        key={transaction.parentOrderId}
                        className="dark:border-strokedark border-[#eee] border-b hover:bg-blue-gray-50 dark:hover:bg-meta-4 cursor-pointer"
                        onClick={() =>
                          navigate(`/transactions/${transaction.parentOrderId}`)
                        }
                      >
                        <td className="py-5 px-4">
                          <p className=" text-blue-600">
                            #{transaction.parentOrderId}
                          </p>
                        </td>

                        <td className="py-5 px-4">
                          <p className="text-black dark:text-white">
                            {transaction.shops.length === 1
                              ? transaction.shops[0].lessorName
                              : transaction.shops[0].lessorName +
                                ", others " +
                                (transaction.shops.length - 1) +
                                " lessors"}
                          </p>
                        </td>
                        <td className="py-5 px-4">
                          <p className="text-black dark:text-white">
                            {transaction.fullName}
                          </p>
                        </td>
                        <td className="py-5 px-4">
                          <p className="text-black dark:text-white text-center">
                            {transaction.shops
                              .map((shop) => shop.vehicles.length)
                              .reduce((a, b) => a + b, 0)}
                          </p>
                        </td>
                        <td className="py-5 px-4">
                          <p className="text-meta-3 dark:text-white">
                            {transaction.totalAmmount.toLocaleString()}
                          </p>
                        </td>

                        <td className="py-5 px-4">
                          <p className="text-meta-3">10.000</p>
                        </td>
                        <td className="py-5 px-4">
                          <p className="text-black dark:text-white">
                            {" "}
                            {new Date(transaction.createdAt).toLocaleString(
                              [],
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </td>

                        <td className="py-5 px-4">
                          <span
                            className={`relative inline-block px-2 py-1 font-bold leading-tight rounded-full text-sm ${
                              transaction?.status === "Pending"
                                ? "text-blue-600 bg-blue-100"
                                : transaction?.status === "Canceled"
                                ? "text-red-600 bg-red-100"
                                : transaction?.status === "On Going"
                                ? "text-[#FF7E06] bg-orange-100"
                                : "text-green-600 bg-green-100"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-5 "></td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
          <Pagination
            metaData={metaData}
            onPageChange={(page: number) => {
              setSearchParams((prev) => {
                prev.set("pageNumber", page.toString());
                return prev;
              });
            }}
            loading={transactionLoaded}
          />
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { Book } from "../../app/models/book";
import BookList from "./BookList";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// Filter by city
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "HCM",
  "HN",
  "Quang Ngai",
  "Quang Ninh",
  "Hue",
  "Da Nang",
  "Vung Tau",
  "Binh Duong",
  "Nha Trang",
  "Phan Thiet",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// End of Filter by city

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .finally(() => setLoading(false));
  }, []);
  const [loading, setLoading] = useState(true);

  // Filter by city
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleFilterByCityChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // End of Filter by city

  // Filter by price
  const [priceFilter, setPriceFilter] = React.useState("");

  const handleFilterByPriceChange = (event: SelectChangeEvent) => {
    setPriceFilter(event.target.value);
  };
  // End of Filter by price

  // Filter by status
  const [statusFilter, setStatusFilter] = React.useState("");
  const handleFilterByStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };
  // End of Filter by status

  //Date picker
  const [startDate, setStartDate] = React.useState<Dayjs | null>();
  // dayjs("2022-04-17")
  const [endDate, setEndDate] = React.useState<Dayjs | null>();
  // dayjs("20-10-2022")
  //End of date picker
  if (loading)
    return (
      <div>
        <svg className="loader" viewBox="0 0 48 30" width="48px" height="30px">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
          >
            <g transform="translate(9.5,19)">
              <circle
                className="loader_tire"
                r="9"
                stroke-dasharray="56.549 56.549"
              ></circle>
              <g
                className="loader_spokes-spin"
                stroke-dasharray="31.416 31.416"
                stroke-dashoffset="-23.562"
              >
                <circle className="loader_spokes" r="5"></circle>
                <circle
                  className="loader_spokes"
                  r="5"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <g transform="translate(24,19)">
              <g
                className="loader_pedals-spin"
                stroke-dasharray="25.133 25.133"
                stroke-dashoffset="-21.991"
                transform="rotate(67.5,0,0)"
              >
                <circle className="loader_pedals" r="4"></circle>
                <circle
                  className="loader_pedals"
                  r="4"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <g transform="translate(38.5,19)">
              <circle
                className="loader_tire"
                r="9"
                stroke-dasharray="56.549 56.549"
              ></circle>
              <g
                className="loader_spokes-spin"
                stroke-dasharray="31.416 31.416"
                stroke-dashoffset="-23.562"
              >
                <circle className="loader_spokes" r="5"></circle>
                <circle
                  className="loader_spokes"
                  r="5"
                  transform="rotate(180,0,0)"
                ></circle>
              </g>
            </g>
            <polyline
              className="loader_seat"
              points="14 3,18 3"
              stroke-dasharray="5 5"
            ></polyline>
            <polyline
              className="loader_body"
              points="16 3,24 19,9.5 19,18 8,34 7,24 19"
              stroke-dasharray="79 79"
            ></polyline>
            <path
              className="loader_handlebars"
              d="m30,2h6s1,0,1,1-1,1-1,1"
              stroke-dasharray="10 10"
            ></path>
            <polyline
              className="loader_front"
              points="32.5 2,38.5 19"
              stroke-dasharray="19 19"
            ></polyline>
          </g>
        </svg>
      </div>
    );
  if (!books) return <h3>Book not found</h3>;
  return (
    <>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex justify-center items-center space-x-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="">
              <DatePicker
                label="Start date"
                defaultValue={dayjs()}
                value={startDate}
                onChange={(newStartDate) => setStartDate(newStartDate)}
                className="xl:w-[10vw] lg:w-[10vw] md:w-[12vw] sm:w-[10vw]"
              />
            </div>
            <div>
              <DatePicker
                label="End date"
                value={endDate}
                onChange={(newEndDate) => setEndDate(newEndDate)}
                className="xl:w-[10vw] lg:w-[10vw] md:w-[12vw] sm:w-[10vw]"
              />
            </div>
          </LocalizationProvider>
        </div>

        <div className="flex flex-wrap justify-center items-center">
          <section className="py-10 bg-gray-50 font-poppins dark:bg-gray-800 ">
            <div className="px-4 py-4 mx-auto max-w-7xl lg:py-6 md:px-6">
              <div className="flex flex-wrap mb-24 -mx-3">
                <div className=" scrollbar overflow-y-auto max-h-[50vw] w-full pr-2 lg:w-1/4 lg:block">
                  {/* Filter by city form */}
                  {/* <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id="demo-multiple-chip-label">City</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleFilterByCityChange}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                          }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  {/* End Filter by city form */}
                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      Brand
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className=" w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    <div className="flex-1">
                      <ul className="h-full grid grid-cols-2 gap-2 p-4 ">
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Yamaha</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center  ">
                            <input type="checkbox" className="w-4 h-4 mr-2 " />
                            <span className="text-lg">Wave</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Dream</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Future</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Exciter</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      Type
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className=" w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    <div className="flex-1">
                      <ul className="h-full grid grid-cols-2 gap-2 p-4">
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Electronic</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center  ">
                            <input type="checkbox" className="w-4 h-4 mr-2 " />
                            <span className="text-lg">Scooter</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Motorbike</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      City
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className=" w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    <div className="flex-1">
                      <ul className="h-full grid grid-cols-2 gap-2 p-4">
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Ho Chi Minh</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center  ">
                            <input type="checkbox" className="w-4 h-4 mr-2 " />
                            <span className="text-lg">Ha Noi</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Quang Ninh</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Quang Ninh</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Quang Ninh</span>
                          </label>
                        </li>
                        <li className="mb-4">
                          <label htmlFor="" className="flex items-center ">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <span className="text-lg">Quang Ninh</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3 lg:w-3/4">
                  <div className="px-3 mb-4">
                    <div className="items-center justify-between px-3 py-2 bg-gray-100 md:flex ">
                      <div className="flex">
                        <a
                          href="#"
                          className="inline-block h-full mr-3 border rounded-md bg-gray-50 "
                        >
                          <svg
                            width="35px"
                            height="35px"
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
                              {" "}
                              <path
                                d="M10.22 15.97L9 17.19V5C9 4.59 8.66 4.25 8.25 4.25C7.84 4.25 7.5 4.59 7.5 5V17.19L6.28 15.97C5.99 15.68 5.51 15.68 5.22 15.97C4.93 16.26 4.93 16.74 5.22 17.03L7.72 19.53C7.79 19.6 7.87 19.65 7.96 19.69C8.05 19.73 8.15 19.75 8.25 19.75C8.35 19.75 8.45 19.73 8.54 19.69C8.63 19.65 8.71 19.6 8.78 19.53L11.28 17.03C11.57 16.74 11.57 16.26 11.28 15.97C10.99 15.68 10.51 15.68 10.22 15.97Z"
                                fill="#000000"
                              ></path>{" "}
                              <path
                                d="M14 11.21C14.39 11.35 14.82 11.15 14.96 10.76L15.24 9.98001H17.27L17.55 10.76C17.66 11.07 17.95 11.26 18.26 11.26C18.34 11.26 18.43 11.25 18.51 11.22C18.9 11.08 19.1 10.65 18.96 10.26L17.25 5.47001C17.08 5.04001 16.69 4.76001 16.25 4.76001C15.81 4.76001 15.42 5.04001 15.25 5.49001L13.55 10.26C13.41 10.65 13.61 11.08 14 11.22V11.21ZM16.73 8.48001H15.77L16.25 7.14001L16.73 8.48001Z"
                                fill="#000000"
                              ></path>{" "}
                              <path
                                d="M18.67 13.46C18.48 13.02 18.08 12.75 17.62 12.75H14.51C14.1 12.75 13.76 13.09 13.76 13.5C13.76 13.91 14.1 14.25 14.51 14.25H16.9L14.07 17.2C13.73 17.56 13.64 18.08 13.83 18.54C14.02 18.98 14.42 19.25 14.88 19.25H18.01C18.42 19.25 18.76 18.91 18.76 18.5C18.76 18.09 18.42 17.75 18.01 17.75H15.62L18.44 14.82C18.78 14.46 18.88 13.93 18.68 13.47L18.67 13.46Z"
                                fill="#000000"
                              ></path>{" "}
                            </g>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="inline-block h-full mr-3 border rounded-md bg-gray-50 "
                        >
                          <svg
                            width="35px"
                            height="35px"
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
                              {" "}
                              <path
                                d="M8.78001 4.47C8.71001 4.4 8.63001 4.35 8.54001 4.31C8.36001 4.23 8.15001 4.23 7.97001 4.31C7.88001 4.35 7.80001 4.4 7.73001 4.47L5.23001 6.97C4.94001 7.26 4.94001 7.74 5.23001 8.03C5.52001 8.32 6.00001 8.32 6.29001 8.03L7.51001 6.81V19C7.51001 19.41 7.85001 19.75 8.26001 19.75C8.67001 19.75 9.01001 19.41 9.01001 19V6.81L10.23 8.03C10.38 8.18 10.57 8.25 10.76 8.25C10.95 8.25 11.14 8.18 11.29 8.03C11.58 7.74 11.58 7.26 11.29 6.97L8.79001 4.47H8.78001Z"
                                fill="#000000"
                              ></path>{" "}
                              <path
                                d="M14 11.21C14.39 11.35 14.82 11.15 14.96 10.76L15.24 9.98001H17.27L17.55 10.76C17.66 11.07 17.95 11.26 18.26 11.26C18.34 11.26 18.43 11.25 18.51 11.22C18.9 11.08 19.1 10.65 18.96 10.26L17.25 5.47001C17.08 5.04001 16.69 4.76001 16.25 4.76001C15.81 4.76001 15.42 5.04001 15.25 5.49001L13.55 10.26C13.41 10.65 13.61 11.08 14 11.22V11.21ZM16.73 8.48001H15.77L16.25 7.14001L16.73 8.48001Z"
                                fill="#000000"
                              ></path>{" "}
                              <path
                                d="M18.67 13.46C18.48 13.02 18.08 12.75 17.62 12.75H14.51C14.1 12.75 13.76 13.09 13.76 13.5C13.76 13.91 14.1 14.25 14.51 14.25H16.9L14.07 17.2C13.73 17.56 13.64 18.08 13.83 18.54C14.02 18.98 14.42 19.25 14.88 19.25H18.01C18.42 19.25 18.76 18.91 18.76 18.5C18.76 18.09 18.42 17.75 18.01 17.75H15.62L18.44 14.82C18.78 14.46 18.88 13.93 18.68 13.47L18.67 13.46Z"
                                fill="#000000"
                              ></path>{" "}
                            </g>
                          </svg>
                        </a>
                      </div>
                      <div className="InputContainer">
                        <input
                          type="text"
                          name="text"
                          className="inputSearch"
                          id="inputSearch"
                          placeholder="Search"
                        />

                        <label htmlFor="input" className="labelforsearch">
                          <svg viewBox="0 0 512 512" className="searchIcon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                          </svg>
                        </label>
                        <div className="border"></div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* <div className="pr-3 border-r border-gray-300">
                          <select
                            name=""
                            id=""
                            className="block w-40 text-base bg-gray-100 cursor-pointer dark:text-gray-400 dark:bg-gray-900"
                          >
                            <option value="">Sort by latest</option>
                            <option value="">Sort by Popularity</option>
                            <option value="">Sort by Price</option>
                          </select>
                        </div>
                        <div className="flex items-center pl-3">
                          <p className="text-xs text-gray-400">Show</p>
                          <div className="px-2 py-2 text-xs text-gray-500 ">
                            <select
                              name=""
                              id=""
                              className="block text-base bg-gray-100 cursor-pointer w-11 dark:text-gray-400 dark:bg-gray-900"
                            >
                              <option value="">15</option>
                              <option value="">17</option>
                              <option value="">19</option>
                            </select>
                          </div>
                        </div> */}
                        <div className="flex">
                          {/* Filter by price form */}
                          <FormControl sx={{ m: 1, minWidth: 80 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">
                              Price
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={priceFilter}
                              onChange={handleFilterByPriceChange}
                              autoWidth
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Increasing</MenuItem>
                              <MenuItem value={21}>Descreasing</MenuItem>
                            </Select>
                          </FormControl>
                          {/* End Filter by price form */}

                          {/* Filter by status form */}
                          <FormControl sx={{ m: 1, minWidth: 90 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">
                              Status
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              value={priceFilter}
                              onChange={handleFilterByStatusChange}
                              autoWidth
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={0}>Available</MenuItem>
                              <MenuItem value={1}>Not available</MenuItem>
                            </Select>
                          </FormControl>
                          {/* End Filter by status form */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center ">
                    <BookList books={books} />
                  </div>
                  <div className="flex justify-end mt-6">
                    <nav aria-label="page-navigation">
                      <ul className="flex list-style-none">
                        <li className="page-item disabled ">
                          <a
                            href="#"
                            className="relative block pointer-events-none px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300  rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-orange-600"
                          >
                            Previous
                          </a>
                        </li>
                        <li className="page-item ">
                          <a
                            href="#"
                            className="relative block px-3 py-1.5 mr-3 text-base hover:text-orange-700 transition-all duration-300 hover:bg-orange-200 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-100 bg-orange-400"
                          >
                            1
                          </a>
                        </li>
                        <li className="page-item ">
                          <a
                            href="#"
                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-orange-100 rounded-md mr-3  "
                          >
                            2
                          </a>
                        </li>
                        <li className="page-item ">
                          <a
                            href="#"
                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-orange-100 rounded-md mr-3 "
                          >
                            3
                          </a>
                        </li>
                        <li className="page-item ">
                          <a
                            href="#"
                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-orange-100 rounded-md "
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

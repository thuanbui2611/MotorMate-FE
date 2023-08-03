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
  if (loading)
    return (
      <div>
        <svg className="loader" viewBox="0 0 48 30" width="48px" height="30px">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
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
        {/* <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              Profile
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Dashboard
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Settings
            </a>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Invoice
            </a>
          </li>
        </ul> */}
        <div className="flex">
          <p className="">Sort by</p>
          {/* Filter by city form */}
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-chip-label">City</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleFilterByCityChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
          </FormControl>
          {/* End Filter by city form */}

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
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <BookList books={books} />
        </div>
      </div>
    </>
  );
}

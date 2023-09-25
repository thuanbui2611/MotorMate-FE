import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Loading from "../../app/components/Loading";
import ProductList from "./ProductList";

import { City } from "../../app/models/Address";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Brand } from "../../app/models/Brand";
import agentTest from "../../app/api/agentTest";
import { set } from "react-hook-form";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City[] | undefined>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand[] | undefined>();
  useEffect(() => {
    //get city data
    fetch("./dataCityVN.json")
      .then((response) => response.json())
      .then((data: City[]) => {
        setCities(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
    //get brands data
    agentTest.Brand.all()
      .then((data) => setBrands(data))
      .catch((error) => {
        console.error("Error loading data:", error);
      });
    //get product data
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);
  const [loading, setLoading] = useState(true);

  // Filter by City
  const handleSelectCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: City[]
  ) => {
    setSelectedCity(newValue);
  };
  // End of Filter by City

  // Filter by Brand
  const handleSelectBrandChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Brand[]
  ) => {
    setSelectedBrand(newValue);
  };
  // End of Filter by Brand
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
  if (loading) return <Loading />;
  if (!products) return <h3>There is no Vehicle</h3>;
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
                <div className="scrollbar overflow-y-auto max-h-[50vw] w-full pr-2 lg:w-1/4 lg:block">
                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      City
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className=" w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    {/* Filter city */}
                    <Autocomplete
                      size="small"
                      multiple={true}
                      disablePortal
                      value={selectedCity}
                      options={cities}
                      getOptionLabel={(option) => option.Name}
                      onChange={(event, newValue) =>
                        handleSelectCityChange(event, newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Filter by cities" />
                      )}
                    />
                  </div>
                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      Brand
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className="w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    <Autocomplete
                      size="small"
                      multiple={true}
                      disablePortal
                      value={selectedBrand}
                      options={brands}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) =>
                        handleSelectBrandChange(event, newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Filter by Brands" />
                      )}
                    />
                  </div>

                  <div className="p-4 mb-5 bg-white border border-gray-200 ">
                    <h2 className="text-2xl font-bold text-center pb-3">
                      Collection
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
                </div>
                <div className="w-full px-3 lg:w-3/4">
                  <div className="px-3 mb-4">
                    <div className="items-center justify-between px-3 py-2 bg-gray-100 md:flex ">
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
                    <ProductList products={products} />
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

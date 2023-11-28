import { useState, useEffect } from "react";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Loading from "../../app/components/Loading";
import ProductList from "./ProductList";

import { City } from "../../app/models/Address";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Brand } from "../../app/models/Brand";
import { useSearchParams } from "react-router-dom";

import dataCityVN from "./../../app/data/dataCityVN.json";
import agent from "../../app/api/agent";
import { Collection } from "../../app/models/Collection";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import {
  getProductsAsync,
  productSelectors,
  setProductParams,
} from "./ProductSlice";
import LoaderButton from "../../app/components/LoaderButton";
import Pagination from "../../app/components/Pagination";
import FadeInSection from "../../app/components/FadeInSection";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    []
  );
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [models, setModels] = useState<ModelVehicle[]>([]);
  const [selectedModels, setSelectedModels] = useState<ModelVehicle[]>([]);
  const [loadingFetchModelsFilter, setLoadingFetchModelsFilter] =
    useState(true);
  const [loadingFetchCollectionsFilter, setLoadingFetchCollectionsFilter] =
    useState(true);
  const [loadingFetchBrandsFilter, setLoadingFetchBrandsFilter] =
    useState(true);
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [paramsCompleted, setParamsCompleted] = useState(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [startDateDefault, setStartDateDefault] = useState<any>();
  const [endDateDefault, setEndDateDefault] = useState<any>();

  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, metaData, productParams } = useAppSelector(
    (state) => state.product
  );

  const dispatch = useAppDispatch();
  //Get params value from url
  const pageNum = searchParams.get("pageNumber");
  const brandsParam = searchParams.get("Brands");
  const modelsParam = searchParams.get("Models");
  const collectionsParam = searchParams.get("Collections");
  const citiesParam = searchParams.get("Cities");
  const isSortPriceDescParam = searchParams.get("IsSortPriceDesc");
  const searchQueryParam = searchParams.get("Search");
  const startDateParam = searchParams.get("StartDate");
  const endDateParam = searchParams.get("EndDate");

  const cities = dataCityVN as City[];

  // Get data for filter
  useEffect(() => {
    //get brands data
    agent.Brand.all()
      .then((data) => {
        setBrands(data);
        setLoadingFetchBrandsFilter(false);
      })
      .catch((error) => {
        console.error("Error fetching brands for filter:", error);
      });
    //get collections data
    agent.Collection.all()
      .then((data) => {
        setCollections(data);
        setLoadingFetchCollectionsFilter(false);
      })
      .catch((error) => {
        console.error("Error fetching collections for filter", error);
      });
    //get models data
    agent.ModelVehicle.all()
      .then((data) => {
        setModels(data);
        setLoadingFetchModelsFilter(false);
      })
      .catch((error) => {
        console.error("Error fetching models for filter", error);
      });
  }, []);
  // End of Get data for filter
  //Get valueFilter from url params, then set selected filterValue and request (dispatch).
  useEffect(() => {
    if (
      models.length > 0 &&
      collections.length > 0 &&
      brands.length > 0 &&
      cities.length > 0
    ) {
      //Model filter
      if (modelsParam !== "") {
        if (modelsParam) {
          const modelsFiltered = modelsParam.split("%2C");
          const modelsSelected = models.filter((model) =>
            modelsFiltered.includes(model.name)
          );
          setSelectedModels(modelsSelected);
          dispatch(setProductParams({ Models: modelsFiltered }));
        } else {
          dispatch(setProductParams({ Models: [] }));
          setSelectedModels([]);
        }
      } else {
        setSearchParams((prev) => {
          prev.delete("Models");
          return prev;
        });
      }
      //Collection filter
      if (collectionsParam !== "") {
        if (collectionsParam) {
          const collectionsFiltered = collectionsParam.split("%2C");
          const collectionsSelected = collections.filter((collection) =>
            collectionsFiltered.includes(collection.name)
          );
          setSelectedCollections(collectionsSelected);
          dispatch(setProductParams({ Collections: collectionsFiltered }));
        } else {
          dispatch(setProductParams({ Collections: [] }));
          setSelectedCollections([]);
        }
      } else {
        setSearchParams((prev) => {
          prev.delete("Collections");
          return prev;
        });
      }
      //Brand filter
      if (brandsParam !== "") {
        if (brandsParam) {
          const brandsFiltered = brandsParam.split("%2C");
          const brandsSelected = brands.filter((brand) =>
            brandsFiltered.includes(brand.name)
          );
          setSelectedBrands(brandsSelected);
          dispatch(setProductParams({ Brands: brandsFiltered }));
        } else {
          dispatch(setProductParams({ Brands: [] }));
          setSelectedBrands([]);
        }
      } else {
        setSearchParams((prev) => {
          prev.delete("Brands");
          return prev;
        });
      }
      //City filter
      if (citiesParam !== "") {
        if (citiesParam) {
          const citiesFiltered = citiesParam.split("%2C");
          const citiesSelected = cities.filter((city) =>
            citiesFiltered.includes(city.Name)
          );
          setSelectedCities(citiesSelected);
          dispatch(setProductParams({ Cities: citiesFiltered }));
        } else {
          dispatch(setProductParams({ Cities: [] }));
          setSelectedCities([]);
        }
      } else {
        setSearchParams((prev) => {
          prev.delete("Cities");
          return prev;
        });
        dispatch(setProductParams({ Cities: [] }));
      }
      setParamsCompleted(true);
    } else
      switch (true) {
        case models === null || typeof models === "undefined":
          console.log("models is null or undefined");
          setParamsCompleted(true);
          break;
        case collections === null || typeof collections === "undefined":
          console.log("collections is null or undefined");
          setParamsCompleted(true);
          break;
        case brands === null || typeof brands === "undefined":
          console.log("brands is null or undefined");
          setParamsCompleted(true);
          break;
        case cities === null || typeof cities === "undefined":
          console.log("cities is null or undefined");
          setParamsCompleted(true);
          break;
        default:
      }
  }, [
    modelsParam,
    models,
    citiesParam,
    cities,
    brandsParam,
    brands,
    collectionsParam,
    collections,
  ]);
  // End of Get valueFilter from url params, then set selected filterValue and request (dispatch).

  useEffect(() => {
    if (!pageNum || pageNum === "1") {
      setSearchParams((prev) => {
        prev.delete("pageNumber");
        return prev;
      });
      dispatch(setProductParams({ pageNumber: 1 }));
    } else {
      dispatch(setProductParams({ pageNumber: +pageNum }));
    }
  }, [pageNum, dispatch]);

  useEffect(() => {
    if (isSortPriceDescParam) {
      setPriceFilter(isSortPriceDescParam);
      dispatch(setProductParams({ IsSortPriceDesc: isSortPriceDescParam }));
    } else {
      setSearchParams((prev) => {
        prev.delete("IsSortPriceDesc");
        return prev;
      });
      dispatch(setProductParams({ IsSortPriceDesc: undefined }));
    }
  }, [isSortPriceDescParam, dispatch]);

  useEffect(() => {
    if (searchQueryParam) {
      const querySearch = searchQueryParam.trim();
      setSearchQuery(querySearch);
      dispatch(setProductParams({ Search: querySearch, pageNumber: 1 }));
    } else {
      setSearchParams((prev) => {
        prev.delete("IsSortPriceDesc");
        return prev;
      });
      dispatch(setProductParams({ Search: undefined }));
    }
  }, [searchQueryParam, dispatch]);
  //End of get valueFilter from url params and set selected

  useEffect(() => {
    if (!productLoaded && paramsCompleted) {
      dispatch(getProductsAsync());
    }
  }, [dispatch, productParams, paramsCompleted]);

  // Handle change filter
  const handleSelectCollectionChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Collection[]
  ) => {
    // set to url params
    if (newValue.length > 0) {
      const collectionsFiltered = newValue?.map(
        (collection) => collection.name
      );
      if (searchParams.get("Collections")) {
        setSearchParams((prev) => {
          prev.set("Collections", collectionsFiltered?.join("%2C") || "");
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.append("Collections", collectionsFiltered?.join("%2C") || "");
          return prev;
        });
      }
    } else {
      setSearchParams((prev) => {
        prev.delete("Collections");
        return prev;
      });
    }
  };

  const handleSelectModelChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: ModelVehicle[]
  ) => {
    // set to url params
    if (newValue.length > 0) {
      const modelsFiltered = newValue?.map((model) => model.name);
      if (searchParams.get("Models")) {
        setSearchParams((prev) => {
          prev.set("Models", modelsFiltered?.join("%2C") || "");
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.append("Models", modelsFiltered?.join("%2C") || "");
          return prev;
        });
      }
    } else {
      setSearchParams((prev) => {
        prev.delete("Models");
        return prev;
      });
    }
  };

  const handleSelectCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: City[]
  ) => {
    if (newValue.length > 0) {
      const citiesFiltered = newValue?.map((city) => city.Name);
      if (searchParams.get("Cities")) {
        setSearchParams((prev) => {
          prev.set("Cities", citiesFiltered?.join("%2C") || "");
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.append("Cities", citiesFiltered?.join("%2C") || "");
          return prev;
        });
      }
    } else {
      setSearchParams((prev) => {
        prev.delete("Cities");
        return prev;
      });
    }
  };

  const handleSelectBrandChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Brand[]
  ) => {
    // set to url params
    if (newValue.length > 0) {
      const brandsFiltered = newValue?.map((brand) => brand.name);
      if (searchParams.get("Brands")) {
        setSearchParams((prev) => {
          prev.set("Brands", brandsFiltered?.join("%2C") || "");
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.append("Brands", brandsFiltered?.join("%2C") || "");
          return prev;
        });
      }
    } else {
      setSearchParams((prev) => {
        prev.delete("Brands");
        return prev;
      });
    }
  };

  const handleFilterPriceChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value.trim();
    setPriceFilter(newValue);
    setSearchParams((prev) => {
      prev.set("IsSortPriceDesc", newValue.toString());
      return prev;
    });
  };
  //search
  const handleSearch = (isReset?: boolean) => {
    if (isReset) {
      setSearchParams((prev) => {
        prev.delete("Search");
        return prev;
      });
      setSearchQuery("");
      return;
    }
    if (searchQuery) {
      setSearchParams((prev) => {
        prev.set("Search", searchQuery.trim());
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete("Search");
        return prev;
      });
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  // End of handle change filter

  // Start of DateRent filter
  useEffect(() => {
    if (startDate && endDate) {
      debugger;
      setSearchParams((prev) => {
        prev.set("StartDate", startDate.format("DD/MM/YYYY"));
        return prev;
      });
      setSearchParams((prev) => {
        prev.set("EndDate", endDate.format("DD/MM/YYYY"));
        return prev;
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDateParam && endDateParam) {
      try {
        const startDateToISO = formatDateToISO(
          decodeURIComponent(startDateParam)
        );
        const endDateToISO = formatDateToISO(decodeURIComponent(endDateParam));
        setStartDate(convertToDayjs(decodeURIComponent(startDateParam)));
        setEndDate(convertToDayjs(decodeURIComponent(endDateParam)));
        dispatch(
          setProductParams({
            DateRentFrom: startDateToISO,
            DateRentTo: endDateToISO,
          })
        );
      } catch (error) {
        toast.error("Please make sure your date is valid");
        console.log(error);
        setSearchParams((prev) => {
          prev.delete("StartDate");
          prev.delete("EndDate");
          return prev;
        });
        dispatch(
          setProductParams({ DateRentFrom: undefined, DateRentTo: undefined })
        );
      }
    } else {
      setSearchParams((prev) => {
        prev.delete("StartDate");
        prev.delete("EndDate");
        return prev;
      });
      dispatch(
        setProductParams({ DateRentFrom: undefined, DateRentTo: undefined })
      );
    }
  }, [startDateParam, endDateParam, dispatch]);

  const formatDateToISO = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    const isoDate = new Date(+year, +month - 1, +day).toISOString();
    return isoDate;
  };

  const convertToDayjs = (dateString: string) => {
    const [day, month, year] = dateString.split("/");
    const dayjsDate = dayjs(new Date(+year, +month - 1, +day));
    return dayjsDate;
  };
  // End of DateRent filter
  if (!metaData) return <Loading />;
  return (
    <FadeInSection options="fade-in-scale">
      <div className="w-full my-12 mx-auto">
        <div className="flex justify-center items-center space-x-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex items-center justify-center gap-4">
              <DatePicker
                label="Start Date"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    width: "90px",
                    paddingRight: "0px",
                  },
                  "& .MuiIconButton-root": {
                    position: "relative",
                    right: "10px",
                    ":hover": {
                      backgroundColor: "rgba(9, 53, 227, 0.3)",
                    },
                  },
                }}
                format="DD/MM/YYYY"
                onChange={(date: any) => setStartDate(date)}
                disablePast={true}
                value={startDate}
              />

              <DatePicker
                label="End Date"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    width: "90px",
                    paddingRight: "0px",
                  },
                  "& .MuiIconButton-root": {
                    position: "relative",
                    right: "10px",
                    ":hover": {
                      backgroundColor: "rgba(9, 53, 227, 0.3)",
                    },
                  },
                }}
                format="DD/MM/YYYY"
                disabled={startDate || startDateDefault ? false : true}
                disablePast={true}
                shouldDisableDate={(date: any) => {
                  return date <= startDate;
                }}
                onChange={(date: any) => setEndDate(date)}
                value={endDate}
              />
            </div>
          </LocalizationProvider>
        </div>

        <div className="flex flex-wrap justify-center items-center w-full">
          <section className="py-10 bg-gray-50 rounded-md w-full md:w-[90%]">
            {/* max-w-7xl lg:py-6 md:px-6 */}
            <div className="px-4 py-4 mx-auto">
              <div className="flex flex-wrap mb-24">
                <div className="grid grid-cols-2  gap-4 lg:gap-4 lg:grid-cols-1 scrollbar overflow-y-auto max-h-[50vw] w-full lg:w-1/5 lg:block">
                  <div className="w-full md:w-[95%] p-4 mx-2 lg:mb-4 lg:mx-0 bg-white border border-gray-200 ">
                    <h2 className=" text-sm md:text-xl lg:text-2xl font-bold text-center pb-3">
                      City
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className=" w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    {/* Filter city */}
                    {!cities ? (
                      <LoaderButton />
                    ) : (
                      <Autocomplete
                        fullWidth={true}
                        size="small"
                        multiple={true}
                        disablePortal
                        value={selectedCities}
                        options={cities}
                        getOptionLabel={(option) => option.Name}
                        onChange={(event, newValue) =>
                          handleSelectCityChange(event, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Filter by Cities"
                            sx={{
                              border: "none",
                              "& .MuiOutlinedInput-input": {
                                boxShadow: "none",
                              },
                            }}
                          />
                        )}
                      />
                    )}
                  </div>

                  <div className="w-full md:w-[95%] p-4 mx-2 lg:mb-4 lg:mx-0 bg-white border border-gray-200 ">
                    <h2 className=" text-sm md:text-xl lg:text-2xl font-bold text-center pb-3">
                      Brand
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className="w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    {loadingFetchBrandsFilter ? (
                      <LoaderButton />
                    ) : (
                      <Autocomplete
                        fullWidth={true}
                        size="small"
                        multiple={true}
                        disablePortal
                        value={selectedBrands}
                        options={brands}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) =>
                          handleSelectBrandChange(event, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              border: "none",
                              "& .MuiOutlinedInput-input": {
                                boxShadow: "none",
                              },
                            }}
                            placeholder="Filter by Brands"
                          />
                        )}
                      />
                    )}
                  </div>

                  <div className="w-full md:w-[95%] p-4 mx-2 lg:mb-4 lg:mx-0 bg-white border border-gray-200 ">
                    <h2 className=" text-sm md:text-xl lg:text-2xl font-bold text-center pb-3">
                      Collections
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className="w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    {/* Filter by collections */}
                    {loadingFetchCollectionsFilter ? (
                      <LoaderButton />
                    ) : (
                      <Autocomplete
                        fullWidth={true}
                        size="small"
                        multiple={true}
                        disablePortal
                        value={selectedCollections}
                        options={collections}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) =>
                          handleSelectCollectionChange(event, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              border: "none",
                              "& .MuiOutlinedInput-input": {
                                boxShadow: "none",
                              },
                            }}
                            placeholder="Collections"
                          />
                        )}
                      />
                    )}
                  </div>

                  <div className="w-full md:w-[95%] p-4 mx-2 lg:mx-0 bg-white border border-gray-200 ">
                    <h2 className=" text-sm md:text-xl lg:text-2xl font-bold text-center pb-3">
                      Models
                    </h2>
                    <div className="flex justify-center items-center h-0">
                      <div className="w-20 pb-2 mb-6 border-b border-rose-600"></div>
                    </div>
                    {/* Filter by collections */}
                    {loadingFetchModelsFilter ? (
                      <LoaderButton />
                    ) : (
                      <Autocomplete
                        fullWidth={true}
                        size="small"
                        multiple={true}
                        disablePortal
                        value={selectedModels}
                        options={models}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) =>
                          handleSelectModelChange(event, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{
                              border: "none",
                              "& .MuiOutlinedInput-input": {
                                boxShadow: "none",
                              },
                            }}
                            placeholder="Models"
                          />
                        )}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-3/4">
                  <div className="px-3 mb-4">
                    <div className="items-center justify-between px-3 py-2 bg-gray-200 rounded-md md:flex ">
                      <div className="InputContainer">
                        <input
                          type="text"
                          name="text"
                          className="inputSearch"
                          id="inputSearch"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => {
                            if (e.target.value) {
                              setSearchQuery(e.target.value);
                            } else {
                              handleSearch(true);
                            }
                          }}
                          onKeyDown={handleKeyDown}
                          style={{ boxShadow: "none" }}
                        />

                        <label
                          htmlFor="input"
                          className="labelforsearch cursor-pointer"
                          onClick={() => handleSearch()}
                        >
                          <svg viewBox="0 0 512 512" className="searchIcon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                          </svg>
                        </label>
                        <div className="border"></div>
                      </div>

                      <div className="flex items-center justify-between">
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
                              onChange={handleFilterPriceChange}
                              autoWidth
                              label="Age"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="false">Increasing</MenuItem>
                              <MenuItem value="true">Descreasing</MenuItem>
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
                              // value={priceFilter}
                              // onChange={handleFilterByStatusChange}
                              defaultValue=""
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

                  <ProductList products={products} />
                  <div className="flex justify-center items-center mt-6">
                    <Pagination
                      metaData={metaData}
                      onPageChange={(page: number) => {
                        setSearchParams((prev) => {
                          prev.set("pageNumber", page.toString());
                          return prev;
                        });
                      }}
                      loading={productLoaded}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </FadeInSection>
  );
}

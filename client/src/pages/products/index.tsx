import { useState, useEffect } from "react";
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
import {
  getBrandsAsync,
  getCities,
  getCollectionsAsync,
  getModelVehiclesAsync,
} from "../filter/FilterSlice";
import { useSearchParams } from "react-router-dom";
import { ConvertToDateStr } from "../../app/utils/ConvertDatetimeToStr";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<Collection[]>(
    []
  );
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [selectedModels, setSelectedModels] = useState<ModelVehicle[]>([]);
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isStartFilter, setIsStartFilter] = useState(false);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const products = useAppSelector(productSelectors.selectAll);
  const { productLoaded, metaData, productParams } = useAppSelector(
    (state) => state.product
  );
  //get data for filter from state
  const {
    brands,
    brandLoading,
    collections,
    collectionLoading,
    modelVehicles,
    modelVehicleLoading,
    cities,
  } = useAppSelector((state) => state.filter);

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

  // Get data for filter
  useEffect(() => {
    if (brands.length === 0 && !brandLoading) {
      dispatch(getBrandsAsync());
    }
    if (collections.length === 0 && !collectionLoading) {
      dispatch(getCollectionsAsync());
    }
    if (modelVehicles.length === 0 && !modelVehicleLoading) {
      dispatch(getModelVehiclesAsync());
    }
    if (cities.length === 0) {
      dispatch(getCities());
    }
  }, []);
  // End of Get data for filter
  //Get valueFilter from url params, then set selected filterValue and request (dispatch).
  useEffect(() => {
    if (
      modelVehicles.length > 0 &&
      collections.length > 0 &&
      brands.length > 0 &&
      cities.length > 0
    ) {
      //Model filter
      if (modelsParam !== "") {
        let modelsFilter: string[] = [];
        if (modelsParam) {
          modelsFilter = modelsParam.split("%2C");
        } else if (productParams.Models && productParams.Models.length > 0) {
          modelsFilter = productParams.Models;
        }
        const modelsSelected = modelVehicles.filter((model) =>
          modelsFilter.includes(model.name)
        );
        setSelectedModels(modelsSelected);
        dispatch(setProductParams({ Models: modelsFilter }));
      } else {
        setSearchParams((prev) => {
          prev.delete("Models");
          return prev;
        });
      }
      //Collection filter
      if (collectionsParam !== "") {
        let collectionsFilter: string[] = [];
        if (collectionsParam) {
          collectionsFilter = collectionsParam.split("%2C");
        } else if (
          productParams.Collections &&
          productParams.Collections.length > 0
        ) {
          collectionsFilter = productParams.Collections;
        }
        const collectionsSelected = collections.filter((collection) =>
          collectionsFilter.includes(collection.name)
        );
        setSelectedCollections(collectionsSelected);
        dispatch(setProductParams({ Collections: collectionsFilter }));
      } else {
        setSearchParams((prev) => {
          prev.delete("Collections");
          return prev;
        });
      }
      //Brand filter
      if (brandsParam !== "") {
        let brandsFilter: string[] = [];
        if (brandsParam) {
          brandsFilter = brandsParam.split("%2C");
        } else if (productParams.Brands && productParams.Brands.length > 0) {
          brandsFilter = productParams.Brands;
        }
        const brandsSelected = brands.filter((brand) =>
          brandsFilter.includes(brand.name)
        );
        setSelectedBrands(brandsSelected);
        dispatch(setProductParams({ Brands: brandsFilter }));
      } else {
        setSearchParams((prev) => {
          prev.delete("Brands");
          return prev;
        });
      }
      //City filter
      if (citiesParam !== "") {
        let citiesFilter: string[] = [];
        if (citiesParam) {
          citiesFilter = citiesParam.split("%2C");
        } else if (productParams.Cities && productParams.Cities.length > 0) {
          citiesFilter = productParams.Cities;
        }
        const citiesSelected = cities.filter((city) =>
          citiesFilter.includes(city.Name)
        );
        setSelectedCities(citiesSelected);
        dispatch(setProductParams({ Cities: citiesFilter }));
      } else {
        setSearchParams((prev) => {
          prev.delete("Cities");
          return prev;
        });
      }
    } else
      switch (true) {
        case modelVehicles === null || typeof modelVehicles === "undefined":
          console.log("models is null or undefined");
          break;
        case collections === null || typeof collections === "undefined":
          console.log("collections is null or undefined");
          break;
        case brands === null || typeof brands === "undefined":
          console.log("brands is null or undefined");
          break;
        case cities === null || typeof cities === "undefined":
          console.log("cities is null or undefined");
          break;
        default:
      }
  }, [
    modelsParam,
    modelVehicles,
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
      if (
        !isStartFilter &&
        productParams.IsSortPriceDesc !== null &&
        productParams.IsSortPriceDesc !== undefined
      ) {
        setPriceFilter(productParams.IsSortPriceDesc.toString());
      } else {
        setSearchParams((prev) => {
          prev.delete("IsSortPriceDesc");
          return prev;
        });
        dispatch(setProductParams({ IsSortPriceDesc: undefined }));
      }
    }
  }, [isSortPriceDescParam, dispatch]);

  useEffect(() => {
    if (searchQueryParam) {
      const querySearch = searchQueryParam.trim();
      setSearchQuery(querySearch);
      dispatch(setProductParams({ Search: querySearch }));
    } else {
      if (productParams.Search) {
        setSearchQuery(productParams.Search);
      } else {
        dispatch(setProductParams({ Search: undefined }));
      }
    }
  }, [searchQueryParam, dispatch]);
  //End of get valueFilter from url params and set selected

  //Starting filter
  useEffect(() => {
    if (!isStartFilter) {
      if (
        pageNum ||
        searchQueryParam ||
        brandsParam ||
        modelsParam ||
        collectionsParam ||
        startDate ||
        endDate ||
        isSortPriceDescParam ||
        citiesParam
      ) {
        setIsStartFilter(true);
      }
    }
  }, [productParams, pageNum]);

  useEffect(() => {
    if (!productLoaded) {
      const params = searchParams as any;
      if (
        isStartFilter &&
        brands.length > 0 &&
        modelVehicles.length > 0 &&
        collections.length > 0 &&
        cities.length > 0
      ) {
        if (
          productParams.Search ||
          (productParams.Brands && productParams.Brands.length > 0) ||
          (productParams.Models && productParams.Models.length > 0) ||
          (productParams.Collections && productParams.Collections.length > 0) ||
          (productParams.Cities && productParams.Cities.length > 0) ||
          productParams.pageSize
        ) {
          dispatch(getProductsAsync());
        }
      } else if (params.size === 0 && products.length === 0) {
        dispatch(getProductsAsync());
      }
    }
  }, [dispatch, productParams, isStartFilter]);

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
      dispatch(setProductParams({ Collections: [] }));
      setSelectedCollections([]);
    }
    setIsStartFilter(true);
    setSearchParams((prev) => {
      prev.set("pageNumber", "1");
      return prev;
    });
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
      dispatch(setProductParams({ Models: [] }));
      setSelectedModels([]);
    }
    setIsStartFilter(true);
    setSearchParams((prev) => {
      prev.set("pageNumber", "1");
      return prev;
    });
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
      dispatch(setProductParams({ Cities: [] }));
      setSelectedCities([]);
    }
    setIsStartFilter(true);
    setSearchParams((prev) => {
      prev.set("pageNumber", "1");
      return prev;
    });
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
      dispatch(setProductParams({ Brands: [] }));
      setSelectedBrands([]);
    }
    setIsStartFilter(true);
    setSearchParams((prev) => {
      prev.set("pageNumber", "1");
      return prev;
    });
  };

  const handleFilterPriceChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value.trim();
    setPriceFilter(newValue);
    setSearchParams((prev) => {
      prev.set("IsSortPriceDesc", newValue.toString());
      return prev;
    });
    setIsStartFilter(true);
  };
  //search
  const handleSearch = (isReset?: boolean) => {
    if (isReset) {
      setSearchParams((prev) => {
        prev.delete("Search");
        return prev;
      });
      setSearchQuery("");
      dispatch(setProductParams({ Search: undefined }));
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
    setSearchParams((prev) => {
      prev.set("pageNumber", "1");
      return prev;
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  // End of handle change filter

  // Start of DateRent filter
  useEffect(() => {
    if (startDate && endDate && isStartFilter) {
      setSearchParams((prev) => {
        prev.set("StartDate", startDate.format("DD/MM/YYYY"));
        return prev;
      });
      setSearchParams((prev) => {
        prev.set("EndDate", endDate.format("DD/MM/YYYY"));
        return prev;
      });
      setSearchParams((prev) => {
        prev.set("pageNumber", "1");
        return prev;
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    let startDateToISO;
    let endDateToISO;
    if (startDateParam && endDateParam) {
      try {
        startDateToISO = formatDateToISO(decodeURIComponent(startDateParam));
        endDateToISO = formatDateToISO(decodeURIComponent(endDateParam));
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
    } else if (productParams.DateRentFrom && productParams.DateRentTo) {
      startDateToISO = productParams.DateRentFrom;
      endDateToISO = productParams.DateRentTo;
    }

    if (startDateToISO && endDateToISO) {
      setStartDate(convertToDayjs(ConvertToDateStr(startDateToISO)));
      setEndDate(convertToDayjs(ConvertToDateStr(endDateToISO)));
      dispatch(
        setProductParams({
          DateRentFrom: startDateToISO,
          DateRentTo: endDateToISO,
        })
      );
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
                disabled={startDate ? false : true}
                disablePast={true}
                shouldDisableDate={(date: any) => {
                  return date <= startDate;
                }}
                onChange={(date: any) => {
                  setEndDate(date);
                  setIsStartFilter(true);
                }}
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
                    {brandLoading ? (
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
                    {collectionLoading ? (
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
                    {modelVehicleLoading ? (
                      <LoaderButton />
                    ) : (
                      <Autocomplete
                        fullWidth={true}
                        size="small"
                        multiple={true}
                        disablePortal
                        value={selectedModels}
                        options={modelVehicles}
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

                <div className="w-full lg:w-3/4 flex-1 px-1">
                  <div className="mb-4">
                    <div className="items-center justify-between px-3 py-2 bg-gray-200 rounded-md flex ">
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
                          <FormControl
                            sx={{
                              m: 1,
                              minWidth: 80,
                              backgroundColor: "white",
                            }}
                          >
                            <InputLabel>Price</InputLabel>
                            <Select
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
                        </div>
                      </div>
                    </div>
                  </div>
                  {productLoaded ? (
                    <Loading />
                  ) : (
                    <ProductList products={products} />
                  )}

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

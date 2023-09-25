import { TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import SelectCityVN from "../../app/components/SelectCityVN";
import { Brand } from "../../app/models/Brand";
import agentTest from "../../app/api/agentTest";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import { Color } from "../../app/models/Color";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/store/ConfigureStore";
import { UserDetail } from "../../app/models/User";
import { uploadImages } from "../../app/utils/Cloudinary";
import { Location } from "../../app/models/Address";

interface Props {
  currentUser: UserDetail | undefined;
  cancelForm: () => void;
}
type Image = {
  name: string;
  url: string;
};
export default function VehicleForm({ currentUser, cancelForm }: Props) {
  //Note:
  const {
    control,
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
  });
  const [imagesUploaded, setImagesUploaded] = useState<FileList | null>();
  const [imagesSelected, setImagesSelected] = useState<Image[] | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [collections, setCollections] = useState<
    [{ id: string; name: string }]
  >([{ id: "", name: "" }]);
  const [selectedCollection, setSelectedCollection] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [models, setModels] = useState<ModelVehicle[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelVehicle | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  useEffect(() => {
    //set review images & selected images
    if (selectedFiles) {
      const imagesReview: Image[] = [];
      for (let i = 0; i < selectedFiles?.length; i++) {
        const file = selectedFiles[i];
        const name = file.name;
        const url = URL.createObjectURL(file);
        imagesReview.push({ name, url });
      }
      setImagesSelected(imagesReview);
    }

    //fetch all brands
    const fetchBrands = async () => {
      try {
        const response = await agentTest.Brand.all();
        setBrands(response);
      } catch (error) {
        console.error("Error fetching brands: ", error);
      }
    };

    fetchBrands();
  }, [selectedFiles]);

  const onClose = () => {
    cancelForm();
  };
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles((prevFiles) => {
      if (prevFiles) {
        // Convert the FileList to an array
        const prevFilesArray = Array.from(prevFiles);
        // Convert the new files to an array
        const newFilesArray = Array.from(files || []);
        // Concatenate the previous and new files arrays
        const combinedFilesArray = [...prevFilesArray, ...newFilesArray];
        // Convert the combined files array back to a FileList
        const combinedFilesList = createFileList(combinedFilesArray);
        return combinedFilesList;
      }
      // If there were no previous files, simply use the new FileList
      return files;
    });
    console.log("Files:", files);
    console.log("Selected file:", selectedFiles);
  };

  const removeImageFromList = (file: Image, index: number) => {
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      fileList.splice(index, 1);
      const convertToFileList = createFileList(fileList);
      setSelectedFiles(convertToFileList);
    }
  };

  const createFileList = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const handleBrandChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Brand | null
  ) => {
    setSelectedBrand(newValue);
    if (!newValue) {
      setSelectedCollection(null);
      setSelectedModel(null);
      setSelectedColor(null);
    }
    if (newValue?.collections) {
      setCollections(newValue.collections);
      setSelectedCollection(null);
      setSelectedModel(null);
      setSelectedColor(null);
    }
  };

  const handleCollectionChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { id: string; name: string } | null
  ) => {
    if (!newValue) {
      setSelectedModel(null);
      setSelectedColor(null);
    }

    setSelectedCollection(newValue);

    const getModels = async () => {
      try {
        if (newValue?.id) {
          const response = await agentTest.Model.getByCollection(newValue?.id);
          setModels(response);
        }
      } catch (error) {
        console.log("Error get models for selectOption:", error);
      }
    };
    getModels();
  };

  const handleModelChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: ModelVehicle | null
  ) => {
    if (!newValue) {
      setSelectedColor(null);
    }
    setSelectedModel(newValue);
    if (newValue?.colors) {
      setColors(newValue.colors);
    }
  };

  const handleColorChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Color | null
  ) => {
    setSelectedColor(newValue);
  };

  const handleLocationChange = (value: Location) => {
    setLocation(value);
  };
  async function submitForm(data: FieldValues) {
    try {
      let images;
      // if(selectedFiles)
      // {
      //   images = await uploadImages(selectedFiles);
      // }
      const address =
        data.locationSpecific +
        " " +
        location?.ward +
        " " +
        location?.district +
        " " +
        location?.city;
      const formData = {
        ownerId: currentUser?.id,
        modelId: selectedModel?.id,
        price: data.price,
        location: address,
        city: location?.city,
        purchaseDate: data.purchaseDate + "T00:00:00.000Z",
        conditionPercentage: data.conditionPercentage,
        licensePlate: data.licensePlate,
        insuranceNumber: data.insuranceNumber,
        insuranceExpiry: data.insuranceExpiry + "T00:00:00.000Z",
        status: 0,
        colorName: selectedColor?.color,
        images: images,
      };
      console.log("form data:", formData);

      // const result = await agentTest.Vehicle.create(formData);
      cancelForm();
    } catch (error) {
      console.log("Error when submit form:", error);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 h-screen w-screen z-50 bg-black bg-opacity-30 flex items-center justify-center`}
        onClick={handleClickOutside}
      >
        <form
          className="relative bg-white w-3/4 max-w-5xl h-fit p-10 pt-6 rounded-xl max-h-[600px] scrollbar overflow-auto"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="border-b-2 border-neutral-100 border-opacity-100 mb-5 pb-5">
            <p className="text-center text-4xl ">Add a vehicle</p>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-1 top-1 rounded-md flex text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
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
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Brand
              </label>
              <Autocomplete
                size="small"
                disablePortal
                value={selectedBrand}
                options={brands}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleBrandChange(event, newValue)
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Collection
              </label>
              <Autocomplete
                disabled={!selectedBrand}
                size="small"
                disablePortal
                value={selectedCollection}
                options={collections}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleCollectionChange(event, newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={`${!selectedBrand && "bg-gray-200 rounded-md"}`}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Model
              </label>
              <Autocomplete
                disabled={!selectedCollection}
                size="small"
                disablePortal
                value={selectedModel}
                options={models}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) =>
                  handleModelChange(event, newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={`${
                      !selectedCollection && "bg-gray-200 rounded-md"
                    }`}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Color
              </label>
              <Autocomplete
                disabled={!selectedModel}
                size="small"
                disablePortal
                value={selectedColor}
                options={colors}
                getOptionLabel={(option) => option.color}
                onChange={(event, newValue) =>
                  handleColorChange(event, newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={`${!selectedModel && "bg-gray-200 rounded-md"}`}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="flex justify-between gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Condition
                </label>
                <TextField
                  size="small"
                  type="number"
                  placeholder="1-100"
                  InputProps={{
                    endAdornment: <div className="pl-2">%</div>,
                  }}
                  {...register("conditionPercentage", {
                    required: "Condition is required",
                  })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Purchase Date
                </label>
                <TextField
                  size="small"
                  type="date"
                  {...register("purchaseDate", {
                    required: "Purchase date is required",
                  })}
                />
              </div>
            </div>
            <div className="flex justify-between gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Insurance Number
                </label>
                <TextField
                  size="small"
                  type="text"
                  {...register("insuranceNumber", {
                    required: "Insurance Number is required",
                  })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Insurance expiry date
                </label>
                <TextField
                  size="small"
                  type="date"
                  {...register("insuranceExpiry", {
                    required: "Insurance expiry is required",
                  })}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                License Plate
              </label>
              <TextField
                size="small"
                type="text"
                placeholder="65L1-24084"
                {...register("licensePlate", {
                  required: "Insurance expiry is required",
                })}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price per day
              </label>
              <TextField
                size="small"
                type="number"
                placeholder="100.000"
                {...register("price", {
                  required: "Price is required",
                })}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <SelectCityVN onSelect={handleLocationChange} />
              </div>

              <div className=" w-full md:w-1/2">
                <TextField
                  fullWidth={true}
                  size="small"
                  type="text"
                  placeholder="House number, street name..."
                  {...register("locationSpecific", {
                    required:
                      "You need to specify your address (house number, street name...)",
                  })}
                />
              </div>
            </div>
          </div>
          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Images
            </label>
            {!imagesSelected && (
              <div className="mb-8 mt-2">
                <input
                  type="file"
                  name="logo"
                  id="file"
                  className="sr-only"
                  onChange={handleImageChange}
                  multiple
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center hover:bg-gray-100 cursor-pointer"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop image here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
            )}
          </div>

          {imagesSelected && (
            <div className="flex gap-3 mb-5 rounded-md bg-[#F5F7FB] py-4 px-8 w-full scrollbar overflow-auto">
              {imagesSelected.map((image, index) => (
                <div className="max-w-[128px] h-40 pb-4" key={index}>
                  <div className="flex items-center justify-between pb-1 ">
                    <span className="truncate text-xs font-medium text-[#07074D]">
                      {image.name}
                    </span>
                    <div
                      className="text-[#07074D] cursor-pointer hover:text-red-600"
                      onClick={() => removeImageFromList(image, index)}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex"></div>
                  <img
                    className="h-full w-40"
                    src={image.url}
                    alt="Logo brand preview"
                  />
                </div>
              ))}
              <div className=" border w-40 h-40">
                <input
                  type="file"
                  name="logo"
                  id="file"
                  className="sr-only"
                  onChange={handleImageChange}
                  multiple
                />
                <label
                  htmlFor="file"
                  className="w-full h-full flex flex-col justify-center items-center hover:bg-gray-200 cursor-pointer"
                >
                  <svg
                    width="30px"
                    height="30px"
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
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#1C274C"
                        strokeWidth="1.2"
                      ></circle>
                      <path
                        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                        stroke="#1C274C"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      ></path>
                    </g>
                  </svg>
                  <span className=" text-xs font-medium ml-1">
                    Add more images
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

import { Button, CardFooter } from "@material-tailwind/react";
import { Vehicle } from "../../app/models/Vehicle";
import Autocomplete from "@mui/material/Autocomplete";
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Brand, Collection } from "../../app/models/Brand";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import { Color } from "../../app/models/Color";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Box, TextField } from "@mui/material";
import { UserDetail } from "../../app/models/User";
import { deleteImages, uploadImages } from "../../app/utils/Cloudinary";
import {
  removeVehicle,
  updateVehicleAsync,
  vehicleSelectors,
} from "./VehicleSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { Image } from "../../app/models/Image";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import LoaderButton from "../../app/components/LoaderButton";
import {
  addVehicleAsync,
  updateVehiclePendingAsync,
  vehiclePendingSelectors,
} from "./VehiclePendingSlice";
import { ConvertToDateStr } from "../../app/utils/ConvertDatetimeToDate";
import { getBrandsAsync, getUsersAsync } from "../filter/FilterSlice";
import { removeVehicleDenied } from "./VehicleDeniedSlice";
import GoogleMapsWrapper from "../../app/components/GoogleMapsWrapper";

interface Props {
  vehicle: Vehicle | null;
  cancelEdit: () => void;
  actionName: string;
}
type ImageFile = {
  name?: string | null;
  url: string | null;
};
export default function VehicleForm({
  vehicle,
  cancelEdit,
  actionName,
}: Props) {
  const [imagesFromServer, setImagesFromServer] = useState<Image[]>([]);
  const [imagesFromServerDeleted, setImagesFromServerDeleted] = useState<
    Image[]
  >([]);
  const [imagesSelected, setImagesSelected] = useState<ImageFile[] | null>(
    null
  );
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [models, setModels] = useState<ModelVehicle[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelVehicle | null>(null);
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [defaultAddress, setDefaultAddress] = useState<string>("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingFetchModel, setLoadingFetchModel] = useState(false);
  const {
    control,
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
  });

  const dispatch = useAppDispatch();

  const { users, brands, usersLoading, brandLoading } = useAppSelector(
    (state) => state.filter
  );

  const getModelsByCollection = async (collectionValue: Collection | null) => {
    try {
      if (collectionValue?.id) {
        setLoadingFetchModel(true);
        const response = await agent.ModelVehicle.getByCollection(
          collectionValue?.id
        );
        return response;
      }
    } catch (error) {
      console.log("Error get models for selectOption:", error);
    }
  };

  useEffect(() => {
    if (vehicle) {
      const vehicleDetails = { ...vehicle };
      vehicleDetails.insuranceExpiry = ConvertToDateStr(
        vehicleDetails.insuranceExpiry
      );
      vehicleDetails.purchaseDate = ConvertToDateStr(
        vehicleDetails.purchaseDate
      );
      reset(vehicleDetails);
      const defaultUser = users.find((x) => x.email === vehicle.owner.email);
      setSelectedUser(defaultUser || null);

      //get images and set selected images
      const defaultImage: ImageFile[] = vehicle.images.map((image) => ({
        // name: image.publicId,
        url: image.image,
      }));
      setImagesSelected(defaultImage);
      //set images from server for delete image in cloudinary
      setImagesFromServer(vehicle.images);
      //set date
      setValue("insuranceExpiry", formatDate(vehicleDetails.insuranceExpiry));
      setValue("purchaseDate", formatDate(vehicleDetails.purchaseDate));
      //set address
      setDefaultAddress(vehicleDetails.address);
      setSelectedCity(vehicleDetails.city);
    }
  }, [vehicle, reset, users]);

  useEffect(() => {
    if (vehicle && brands.length > 0) {
      const defaultBrand = brands.find(
        (x) => x.id === vehicle.specifications.brandId
      );
      setSelectedBrand(defaultBrand || null);
      setCollections(defaultBrand?.collections || []);
    }
  }, [vehicle, brands]);

  useEffect(() => {
    if (vehicle && collections.length > 0) {
      const defaultCollection = collections.find(
        (x) => x.id === vehicle.specifications.collectionId
      );
      setSelectedCollection(defaultCollection || null);
      getModelsByCollection(defaultCollection || null)
        .then((response) => {
          setModels(response);
          const defaultModel = response.find(
            (x: Collection) => x.id === vehicle.specifications.modelId
          );
          setSelectedModel(defaultModel || null);
          setColors(defaultModel?.colors || []);
          setLoadingFetchModel(false);
        })
        .catch((error) => {
          console.log("Error when fetching collections:", error);
        });
    }
  }, [vehicle, collections]);

  useEffect(() => {
    if (vehicle && colors.length > 0) {
      const defaultColor = colors.find(
        (x) => x.color === vehicle.specifications.color
      );
      setSelectedColor(defaultColor || null);
    }
  }, [vehicle, colors]);

  useEffect(() => {
    //fetch all brands
    if (brands.length === 0 && !brandLoading) {
      dispatch(getBrandsAsync());
    }
    //fetch all users
    if (users.length === 0 && !usersLoading) {
      dispatch(getUsersAsync());
    }
  }, []);

  useEffect(() => {
    //add selected images when user upload
    if (selectedFiles) {
      const imagesSelected: ImageFile[] = [];
      // Set image from server
      if (imagesFromServer) {
        const setImageSelected: ImageFile[] = imagesFromServer.map((image) => ({
          url: image.image,
        }));
        setImagesSelected(setImageSelected);
      }
      // Set image from user upload
      // Convert selectedFiles to selectedImages
      for (let i = 0; i < selectedFiles?.length; i++) {
        const file = selectedFiles[i];
        const name = file.name;
        const url = URL.createObjectURL(file);
        imagesSelected.push({ name, url });
      }
      setImagesSelected((prevImages) => [...prevImages!, ...imagesSelected]);
    }
  }, [selectedFiles]);

  const onClose = () => {
    cancelEdit();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles((prevFiles) => {
      // Check type
      for (let i = 0; i < files?.length!; i++) {
        if (!files![i].type.startsWith("image/")) {
          toast.error("Accept only image file");
          return prevFiles;
        }
      }
      // Check limit file upload
      if (files?.length! > 5) {
        toast.error("You can only upload 5 images");
        return prevFiles;
      }
      // Check prev files limit
      if (imagesSelected && imagesSelected.length + files!.length > 5) {
        toast.error("You can only use 5 images");
        return prevFiles;
      }
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
    //reset input
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
  };

  const removeImageFromList = (file: ImageFile, index: number) => {
    if (selectedFiles) {
      //Remove image from user upload
      const fileList = Array.from(selectedFiles);
      fileList.splice(index, 1);
      setSelectedFiles(createFileList(fileList));
    }
    if (imagesFromServer) {
      //Remove image from server
      const imageDeleted = imagesFromServer.find(
        (image) =>
          image.image?.trim().toLowerCase() === file.url?.trim().toLowerCase()
      );
      if (imageDeleted) {
        //remove image of state image-from-server
        const imagesList = [...imagesFromServer];
        const resultImagesFromServer = imagesList.filter(
          (image) => image.publicId !== imageDeleted.publicId
        );
        setImagesFromServer(resultImagesFromServer);
        //remove image from selected images
        const imagesSelectedList = [...imagesSelected!];
        const resultImageSelected = imagesSelectedList.filter(
          (image) =>
            image.url?.trim().toLowerCase() !==
            imageDeleted.image?.trim().toLowerCase()
        );
        setImagesSelected(resultImageSelected);
        setImagesFromServerDeleted((prev) => [...prev, { ...imageDeleted }]);
      }
      //set remove image to cloudinary after change
      // setImagesFromServer(images);
    }
  };

  const createFileList = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };
  const handleUserChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: UserDetail | null
  ) => {
    setSelectedUser(newValue);
  };

  const handleBrandChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Brand | null
  ) => {
    setSelectedBrand(newValue);
    if (newValue?.collections) {
      setCollections(newValue.collections);
    }
    setSelectedCollection(null);
    setSelectedModel(null);
    setSelectedColor(null);
  };

  const handleCollectionChange = async (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Collection | null
  ) => {
    if (newValue) {
      setLoadingFetchModel(true);
      setSelectedCollection(newValue);
      const model = await getModelsByCollection(newValue);
      setModels(model);
      setLoadingFetchModel(false);
    }
    setSelectedModel(null);
    setSelectedColor(null);
  };

  const handleModelChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: ModelVehicle | null
  ) => {
    setSelectedModel(newValue);
    if (newValue?.colors) {
      setColors(newValue.colors);
    }
    setSelectedColor(null);
  };

  const handleColorChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Color | null
  ) => {
    setSelectedColor(newValue);
  };

  const handleAddressSelect = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    const address: any = autocompleteRef.current;
    const fullAddress = address.gm_accessors_.place.em.formattedPrediction;
    if (!place) {
      toast.error("Please select a valid address");
      return;
    }
    // Retrieve the address components
    const addressComponents = place.address_components;

    // Find the city component
    const cityComponent = addressComponents!.find((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const districtComponent = addressComponents!.find((component) =>
      component.types.includes("administrative_area_level_2")
    );

    // Retrieve the city and district
    const city = cityComponent ? cityComponent.long_name : "";
    const district = districtComponent ? districtComponent.long_name : "";
    const { place_id } = place;

    // Validate the place_id to ensure it is a valid selection
    if (place_id) {
      setValue("address", fullAddress);
      setSelectedCity(city);
      setSelectedDistrict(district);
    } else {
      setValue("address", null);
      toast.error("Please select a valid address");
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the form from automatically submitting
    }
  };

  async function submitForm(data: FieldValues) {
    try {
      if (!data.address) {
        toast.error("Please select a valid address");
        return;
      }
      let imagesRequest: Image[] | null = [];
      const formData = {
        id: vehicle?.id,
        ownerId: selectedUser?.id,
        modelId: selectedModel?.id,
        price: data.price,
        address: data.address,
        district: selectedDistrict ? selectedDistrict : "N/A",
        ward: "N/A",
        city: selectedCity,
        purchaseDate: data.purchaseDate,
        conditionPercentage: data.conditionPercentage,
        licensePlate: data.licensePlate,
        insuranceNumber: data.insuranceNumber,
        insuranceExpiry: data.insuranceExpiry,
        isActive: 0,
        colorName: selectedColor?.color,
        images: imagesRequest,
      };

      if (vehicle) {
        if (imagesFromServer) {
          //EDIT VEHICLE
          //remove image from server
          if (imagesFromServerDeleted) {
            await deleteImages(imagesFromServerDeleted);
          }
          //get image to upload new image to cloudinary
          let resultUploadImage: Image[] | null = [];
          const imagesUploadToCloudinary = selectedFiles;
          //upload image to cloudinary
          if (imagesUploadToCloudinary) {
            resultUploadImage = await uploadImages(imagesUploadToCloudinary);
          }
          //Get image from server and image uploaded to cloudinary
          const resultUpload = [...imagesFromServer, ...resultUploadImage!];

          //Update images request to formData
          formData.images = resultUpload;
          //Update vehicle
          const result = await dispatch(updateVehiclePendingAsync(formData));
          //Remove vehicle from list vehicle (vehicle updated will be pending)
          debugger;
          if (result.meta.requestStatus === "fulfilled") {
            switch (vehicle.status.trim().toLowerCase()) {
              case "approved":
                dispatch(removeVehicle(vehicle.id));
                break;
              case "deny":
                dispatch(removeVehicleDenied(vehicle.id));
                break;
            }
          }
        }
      } else {
        //ADD VEHICLE
        if (selectedFiles) {
          let images = await uploadImages(selectedFiles);
          formData.images = images!;
        }
        await dispatch(addVehicleAsync(formData));
      }
      cancelEdit();
    } catch (error) {
      console.log("Error when submit form:", error);
    }
  }
  const formatDate = (dateStr: string) => {
    const parts = dateStr.split("/");
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  };
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      {/* <Dialog
        size="xl"
        open={true}
        handler={cancelEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[100rem] ">
          <CardHeader className=" mx-auto text-center w-fit px-10 bg-orange-500 ">
            <Typography
              variant="h3"
              className="text-center py-4  text-white rounded-sm"
            >
              {actionName}
            </Typography>
          </CardHeader>
          
        </Card>
      </Dialog> */}

      <div
        className={`fixed inset-0 h-screen w-screen z-9999 bg-black bg-opacity-30 flex items-center justify-center`}
        onClick={handleClickOutside}
      >
        <form
          className="relative bg-white max-w-5xl h-fit p-10 rounded-xl max-h-[600px] scrollbar overflow-auto"
          onKeyDown={handleKeyPress}
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="border-b-2 border-neutral-100 border-opacity-100 mb-5 pb-5">
            <p className="text-center text-4xl font-bold text-gradient">
              {actionName}
            </p>
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
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1 flex flex-col">
              <label className="block mb-2 text-sm font-semibold text-black">
                Owner
              </label>
              {usersLoading ? (
                <LoaderButton />
              ) : (
                <Autocomplete
                  size="small"
                  disablePortal
                  value={selectedUser}
                  options={users}
                  getOptionLabel={(option) => option.username}
                  onChange={(event, newValue) =>
                    handleUserChange(event, newValue)
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <div className="flex items-center justify-start">
                        <div className="h-12 w-12 rounded-md mr-2">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={
                              option.image.imageUrl
                                ? option.image.imageUrl
                                : require("../../app/assets/images/icon/user.png")
                            }
                            alt="Avatar"
                          />
                        </div>
                        {option.username}
                      </div>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            {selectedUser && (
                              <img
                                className="h-6 w-6 rounded-full"
                                src={
                                  selectedUser.image.imageUrl
                                    ? selectedUser.image.imageUrl
                                    : require("../../app/assets/images/icon/user.png")
                                }
                                alt="Avatar"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            </div>
            {selectedUser && (
              <div className="md:col-span-2 flex justify-start items-end">
                <div className="flex flex-wrap gap-4 md:gap-2 md:grid md:grid-cols-2">
                  <div className="flex">
                    <label className="block text-sm font-semibold text-black">
                      Fullname:
                    </label>
                    <p className="block ml-1 text-sm font-medium text-black">
                      {selectedUser.fullName}
                    </p>
                  </div>

                  <div className="flex">
                    <label className="block text-sm  font-semibold text-black">
                      Email:
                    </label>
                    <p className="block ml-1 text-sm font-medium text-black">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className="flex">
                    <label className="block text-sm  font-semibold text-black">
                      Phone number:
                    </label>
                    <p className="block ml-1 text-sm font-medium text-black">
                      {selectedUser.phoneNumber}
                    </p>
                  </div>
                  <div className="flex">
                    <label className="block text-sm  font-semibold text-black">
                      Address:
                    </label>
                    <p className="block ml-1 text-sm font-medium text-black">
                      {selectedUser.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-semibold text-black">
                Brand
              </label>
              {brandLoading ? (
                <LoaderButton />
              ) : (
                <Autocomplete
                  size="small"
                  disablePortal
                  value={selectedBrand}
                  options={brands}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) =>
                    handleBrandChange(event, newValue)
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <div className="flex items-center justify-start">
                        <div className="h-12 w-12 rounded-md mr-2">
                          <img
                            className="h-full w-full rounded-md object-cover"
                            src={option.image.image}
                            alt="logo brand"
                          />
                        </div>
                        {option.name}
                      </div>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            {selectedBrand && (
                              <img
                                className="h-6 w-6 rounded-full"
                                src={selectedBrand.image.image}
                                alt="logo brand"
                              />
                            )}
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              )}
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-semibold text-black">
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
                    required
                    className={`${
                      !selectedBrand && "bg-blue-gray-50 rounded-md"
                    }`}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-semibold text-black">
                Model
              </label>
              {loadingFetchModel ? (
                <LoaderButton />
              ) : (
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
                      required
                      className={`${
                        !selectedCollection && " bg-blue-gray-50 rounded-md"
                      }`}
                    />
                  )}
                />
              )}
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-semibold text-black">
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
                    required
                    className={`${
                      !selectedModel && "bg-blue-gray-50 rounded-md"
                    }`}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="flex justify-between gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-black">
                  Condition
                </label>
                <AppTextInput
                  label=""
                  control={control}
                  size="small"
                  type="number"
                  placeholder="1-100"
                  InputProps={{
                    endAdornment: <div className="pl-2">%</div>,
                  }}
                  {...register("conditionPercentage", {
                    required: "Condition is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid condition, accept only number",
                    },
                    validate: (value) => {
                      if (value > 100 || value < 0) {
                        return "Condion must be between 0 and 100";
                      }
                      return true;
                    },
                  })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-black">
                  Purchase Date
                </label>
                <AppTextInput
                  label=""
                  control={control}
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
                <label className="block mb-2 text-sm font-semibold text-black">
                  Insurance Number
                </label>
                <AppTextInput
                  label=""
                  control={control}
                  size="small"
                  type="text"
                  {...register("insuranceNumber", {
                    required: "Insurance Number is required",
                  })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-black">
                  Insurance expiry date
                </label>
                <AppTextInput
                  label=""
                  control={control}
                  size="small"
                  type="date"
                  {...register("insuranceExpiry", {
                    required: "Insurance expiry is required",
                  })}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-black">
                License Plate
              </label>
              <AppTextInput
                label=""
                control={control}
                size="small"
                type="text"
                placeholder="65L1-24084"
                {...register("licensePlate", {
                  required: "License plate is required",
                })}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-black">
                Price per day
              </label>
              <AppTextInput
                label=""
                control={control}
                size="small"
                type="number"
                placeholder="100.000"
                {...register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid price, accept only number",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label className="block mb-3 text-sm font-semibold text-black">
              Address
            </label>
            <div className="w-full">
              <GoogleAutocomplete
                options={{
                  componentRestrictions: { country: "vn" },
                }}
                className=" z-999999"
                onLoad={(autocomplete) =>
                  (autocompleteRef.current = autocomplete)
                }
                onPlaceChanged={handleAddressSelect}
              >
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  placeholder="House number, street name..."
                  {...register("address", {
                    required:
                      "You need to specify your address (house number, street name...)",
                    pattern: {
                      value:
                        /^(?!.*[<>])(?!.*<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>)(?!.*\b(xss|XSS)\b).*$/i,
                      message: "Invalid address",
                    },
                  })}
                  defaultValue={defaultAddress}
                />
              </GoogleAutocomplete>
            </div>
          </div>
          <div className="mb-1">
            <label className="block text-sm font-semibold text-black">
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
                  accept="image/*"
                  ref={fileInputRef}
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
            <div className="flex h-[190px] gap-3 mb-5 rounded-md bg-[#F5F7FB] py-4 px-8 w-full scrollbar overflow-auto">
              {imagesSelected.map((image, index) => (
                <div className="w-1/5 pb-4" key={index}>
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
                    className="h-full w-full"
                    src={image.url || undefined}
                    alt="Vehicle Images"
                  />
                </div>
              ))}
              {imagesSelected && imagesSelected?.length < 5 && (
                <div className=" border w-40 h-full">
                  <input
                    type="file"
                    name="logo"
                    id="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                    ref={fileInputRef}
                    multiple
                  />
                  <label
                    htmlFor="file"
                    className="w-full h-full flex flex-col justify-center items-center hover:bg-blue-gray-50 cursor-pointer"
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
              )}
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
              className="ml-2 text-sm font-medium text-black dark:text-gray-300"
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
          <CardFooter className="pt-0 pb-0 flex flex-row justify-center gap-16 ">
            <LoadingButton
              className="bg-gradient-to-tr from-light-blue-600 to-light-blue-400 text-white shadow-md shadow-light-blue-500/20 hover:shadow-lg hover:shadow-light-blue-500/40 active:opacity-[0.85]"
              loading={isSubmitting}
              disabled={
                isSubmitting ||
                usersLoading ||
                brandLoading ||
                loadingFetchModel
              }
              type="submit"
              variant="contained"
              color="success"
            >
              <span className="font-bold">Confirm</span>
            </LoadingButton>
            <Button variant="gradient" color="red" size="lg" onClick={onClose}>
              Cancel
            </Button>
          </CardFooter>
        </form>
      </div>
    </>
  );
}

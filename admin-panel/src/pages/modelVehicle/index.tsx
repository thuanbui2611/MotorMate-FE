import { useState, useEffect } from "react";
import { Collection } from "typescript";
import Breadcrumb from "../../app/components/Breadcrumb";
import ConfirmDeleteDialog from "../../app/components/ConfirmDeleteDialog";
import Loader from "../../app/components/Loader";
import { useAppSelector, useAppDispatch } from "../../app/store/ConfigureStore";
import CollectionForm from "../collection/CollectionForm";
import {
  collectionSelectors,
  deleteCollectionAsync,
  getCollectionsAsync,
  setCollectionParams,
} from "../collection/CollectionSlice";
import { ModelVehicle } from "../../app/models/ModelVehicle";
import {
  deleteModelVehicleAsync,
  getModelVehiclesAsync,
  modelVehicleSelectors,
} from "./ModelVehicleSlice";
import ModelVehicleForm from "./ModelVehicleForm";
import Pagination from "../../app/components/Pagination";
import "./../../app/assets/css/custom.css";

export default function ModelVehiclePage() {
  const [actionName, setActionName] = useState(String);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedModelVehicle, setSelectedModelVehicle] =
    useState<ModelVehicle | null>(null);
  const [confirmDeleteDiaglog, setConfirmDeleteDiaglog] = useState(false);
  const [modelVehicleDeleted, setModelVehicleDeleted] = useState<ModelVehicle>(
    {} as ModelVehicle
  );

  const modelVehicles = useAppSelector(modelVehicleSelectors.selectAll);
  const { modelVehicleLoaded, metaData, modelVehicleParams } = useAppSelector(
    (state) => state.modelVehicle
  );
  const dispatch = useAppDispatch();
  const handleSelectModelVehicle = (
    actionName: string,
    modelVehicle?: ModelVehicle
  ) => {
    setOpenEditForm((cur) => !cur);
    if (modelVehicle) {
      setSelectedModelVehicle(modelVehicle);
    }
    setActionName(actionName);
  };

  const cancelEditForm = () => {
    setOpenEditForm((cur) => !cur);
    setSelectedModelVehicle(null);
  };

  async function handleDeleteModelVehicle(modelVehicleDeleted: ModelVehicle) {
    await dispatch(deleteModelVehicleAsync(modelVehicleDeleted.id));
  }
  const openConfirmDeleteDiaglog = (modelVehicle: ModelVehicle) => {
    setConfirmDeleteDiaglog((cur) => !cur);
    setModelVehicleDeleted(modelVehicle);
  };
  const cancelConfirmDeleteDiaglog = () => setConfirmDeleteDiaglog(false);

  useEffect(() => {
    if (!modelVehicleLoaded) {
      dispatch(getModelVehiclesAsync());
    }
  }, [dispatch, modelVehicleParams]);
  if (!metaData) {
    return <Loader />;
  } else
    return (
      <>
        <Breadcrumb pageName="Model Vehicle" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-end">
            <button
              onClick={() =>
                handleSelectModelVehicle("Add a new model for vehicle")
              }
              type="button"
              className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 21.00 21.00"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#ffffff"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>plus_circle [#ffffff]</title>
                  <desc>Created with Sketch.</desc> <defs> </defs>
                  <g
                    id="Page-1"
                    strokeWidth="0.00021000000000000004"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-419.000000, -520.000000)"
                      fill="#ffffff"
                    >
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        <path
                          d="M374.55,369 L377.7,369 L377.7,371 L374.55,371 L374.55,374 L372.45,374 L372.45,371 L369.3,371 L369.3,369 L372.45,369 L372.45,366 L374.55,366 L374.55,369 Z M373.5,378 C368.86845,378 365.1,374.411 365.1,370 C365.1,365.589 368.86845,362 373.5,362 C378.13155,362 381.9,365.589 381.9,370 C381.9,374.411 378.13155,378 373.5,378 L373.5,378 Z M373.5,360 C367.70085,360 363,364.477 363,370 C363,375.523 367.70085,380 373.5,380 C379.29915,380 384,375.523 384,370 C384,364.477 379.29915,360 373.5,360 L373.5,360 Z"
                          id="plus_circle-[#ffffff]"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span>Add new model vehicle</span>
            </button>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className=" bg-gray-2 text-left dark:bg-meta-4  font-bold">
                  <th className="min-w-[180px] py-4 px-4 text-black dark:text-white ">
                    Model Name
                  </th>
                  <th className="min-w-[180px] py-4 px-4 text-black dark:text-white">
                    Collection name
                  </th>
                  <th className="w-[120px] py-4 px-4 text-black dark:text-white">
                    Color
                  </th>
                  <th className="min-w-[40px] text-center py-4 px-4 text-black dark:text-white">
                    Capacity
                  </th>
                  <th className="min-w-[50px] py-4 px-4 text-black dark:text-white">
                    Year
                  </th>
                  <th className="min-w-[60px] text-center py-4 px-4 text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {modelVehicleLoaded ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <Loader className="h-70 " />
                    </td>
                  </tr>
                ) : (
                  <>
                    {modelVehicles.map((modelVehicle) => (
                      <tr key={modelVehicle.id}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark max-w-45">
                          <h5 className="font-medium text-black dark:text-white whitespace-normal overflow-wrap-normal line-clamp-3">
                            {modelVehicle.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {modelVehicle.collection.name}
                          </h5>
                        </td>
                        <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex flex-col max-h-25 overflow-y-auto scrollbar">
                            {modelVehicle.colors.map((color, index) => (
                              <h5
                                className="font-medium text-left text-black dark:text-white"
                                key={index}
                              >
                                {color.color}
                              </h5>
                            ))}
                          </div>
                        </td>
                        <td className="border-b text-center border-[#eee] py-5 px-4 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {modelVehicle.capacity}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {modelVehicle.year}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] text-center py-5 px-4 dark:border-strokedark">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            Enable
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              className="  hover:text-primary hover:bg-primary/30 rounded-full "
                              onClick={() =>
                                handleSelectModelVehicle(
                                  "Edit Model of Vehicle",
                                  modelVehicle
                                )
                              }
                            >
                              <svg
                                className="fill-current"
                                width="18px"
                                height="18px"
                                viewBox="0 -0.5 21 21"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                fill="none"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  <title>edit [#1483]</title>
                                  <desc>Created with Sketch.</desc>
                                  <defs> </defs>
                                  <g id="Page-1" fill="none" fillRule="evenodd">
                                    <g
                                      id="Dribbble-Light-Preview"
                                      transform="translate(-339.000000, -360.000000)"
                                      fill="#000000"
                                    >
                                      <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                      >
                                        <path
                                          d="M283,220 L303.616532,220 L303.616532,218.042095 L283,218.042095 L283,220 Z M290.215786,213.147332 L290.215786,210.51395 L296.094591,205.344102 L298.146966,207.493882 L292.903151,213.147332 L290.215786,213.147332 Z M299.244797,202.64513 L301.059052,204.363191 L299.645788,205.787567 L297.756283,203.993147 L299.244797,202.64513 Z M304,204.64513 L299.132437,200 L288.154133,209.687714 L288.154133,215.105237 L293.78657,215.105237 L304,204.64513 Z"
                                          className="fill-current"
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </button>
                            <button
                              className="hover:text-red-600 hover:bg-red-600/30 rounded-full p-1"
                              onClick={() =>
                                openConfirmDeleteDiaglog(modelVehicle)
                              }
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                  fill=""
                                />
                                <path
                                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                  fill=""
                                />
                                <path
                                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                  fill=""
                                />
                                <path
                                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                  fill=""
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Pagination
              metaData={metaData}
              onPageChange={(page: number) => {
                dispatch(setCollectionParams({ pageNumber: page }));
              }}
              loading={modelVehicleLoaded}
            />
          </div>
        </div>
        {openEditForm && (
          <ModelVehicleForm
            modelVehicle={selectedModelVehicle}
            cancelEdit={cancelEditForm}
            actionName={actionName}
          />
        )}

        {confirmDeleteDiaglog && (
          <ConfirmDeleteDialog
            objectName={modelVehicleDeleted.name}
            actionDelete={() => handleDeleteModelVehicle(modelVehicleDeleted)}
            cancelDelete={cancelConfirmDeleteDiaglog}
          />
        )}
      </>
    );
}

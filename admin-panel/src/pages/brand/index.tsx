import { useEffect, useState } from "react";
import Breadcrumb from "../../app/components/Breadcrumb";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import {
  brandSelectors,
  deleteBrandAsync,
  getBrandsAsync,
  setBrandParams,
} from "./BrandSlice";
import Loader from "../../app/components/Loader";
import Pagination from "../../app/components/Pagination";
import BrandForm from "./BrandForm";
import { Brand } from "../../app/models/Brand";
import ConfirmDeleteDialog from "../../app/components/ConfirmDeleteDialog";
import { deleteImage } from "../../app/utils/Cloudinary";
import { useSearchParams } from "react-router-dom";

export default function BrandPage() {
  const [pageNumber, setPageNumber] = useSearchParams({ pageNumber: "" });
  const [actionName, setActionName] = useState(String);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [confirmDeleteDiaglog, setConfirmDeleteDiaglog] = useState(false);
  const [brandDeleted, setBrandDeleted] = useState<Brand>({} as Brand);
  const [isStartFilter, setIsStartFilter] = useState(false);
  const brands = useAppSelector(brandSelectors.selectAll);
  const { brandLoaded, metaData, brandParams } = useAppSelector(
    (state) => state.brand
  );
  const dispatch = useAppDispatch();

  const pageNum = pageNumber.get("pageNumber");
  useEffect(() => {
    if (pageNum === "1") {
      setPageNumber((prev) => {
        prev.delete("pageNumber");
        return prev;
      });
      dispatch(setBrandParams({ pageNumber: 1 }));
    } else if (pageNum) {
      dispatch(setBrandParams({ pageNumber: +pageNum }));
    }
  }, [pageNum, dispatch]);

  //Starting filter
  useEffect(() => {
    if (!isStartFilter) {
      if (pageNum) {
        setIsStartFilter(true);
      }
    }
  }, [brandParams, pageNum]);

  const handleSelectBrand = (actionName: string, brand?: Brand) => {
    setOpenEditForm((cur) => !cur);
    if (brand) {
      setSelectedBrand(brand);
    }
    setActionName(actionName);
  };

  const cancelEditForm = () => {
    setOpenEditForm((cur) => !cur);
    setSelectedBrand(null);
  };

  async function handleDeleteBrand(brandDeleted: Brand) {
    const response = await dispatch(deleteBrandAsync(brandDeleted.id));
    if (
      response.meta.requestStatus === "fulfilled" &&
      brandDeleted.image.publicId
    ) {
      await deleteImage(brandDeleted.image.publicId);
    }
  }
  const openConfirmDeleteDiaglog = (brand: Brand) => {
    setConfirmDeleteDiaglog((cur) => !cur);
    setBrandDeleted(brand);
  };
  const cancelConfirmDeleteDiaglog = () => setConfirmDeleteDiaglog(false);

  useEffect(() => {
    if (!brandLoaded) {
      if (isStartFilter || brands.length === 0) {
        dispatch(getBrandsAsync());
      }
    }
  }, [dispatch, brandParams, isStartFilter]);

  if (!metaData) {
    return <Loader />;
  } else
    return (
      <>
        <Breadcrumb pageName="Brand" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex justify-end">
            <button
              onClick={() => handleSelectBrand("Add a new brand")}
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
              <span>Add new brand</span>
            </button>
          </div>
          <div className="max-w-full overflow-x-auto scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className=" bg-gray-2 text-left dark:bg-meta-4  font-bold">
                  <th className="min-w-[220px] py-4 px-4 text-black dark:text-white xl:pl-11">
                    Brand Name
                  </th>
                  <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                    Profit
                  </th>
                  <th className="min-w-[120px] py-4 px-4 text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {brandLoaded ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      <Loader className="h-70 " />
                    </td>
                  </tr>
                ) : (
                  <>
                    {brands.map((brand) => (
                      <tr key={brand.id}>
                        <td className="flex items-center border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <div className="h-12 w-12 rounded-md">
                            <img src={brand.image.image} alt="logo" />
                          </div>
                          <h5 className="ml-4 font-medium text-black dark:text-white">
                            {brand.name}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-meta-3 ">10.000</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                            Enable
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button
                              className="hover:text-primary hover:bg-primary/30 rounded-full "
                              onClick={() =>
                                handleSelectBrand("Edit brand", brand)
                              }
                            >
                              <svg
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
                                  <defs> </defs>
                                  <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
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
                                          id="edit-[#1483]"
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
                              onClick={() => openConfirmDeleteDiaglog(brand)}
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
                setPageNumber((prev) => {
                  prev.set("pageNumber", page.toString());
                  return prev;
                });
              }}
              loading={brandLoaded}
            />
          </div>
        </div>
        {openEditForm && (
          <BrandForm
            brand={selectedBrand}
            cancelEdit={cancelEditForm}
            actionName={actionName}
          />
        )}

        {confirmDeleteDiaglog && (
          <ConfirmDeleteDialog
            objectName={brandDeleted.name}
            actionDelete={() => handleDeleteBrand(brandDeleted)}
            cancelDelete={cancelConfirmDeleteDiaglog}
          />
        )}
      </>
    );
}

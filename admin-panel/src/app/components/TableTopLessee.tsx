import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { getTopLesseesAsync } from "../../pages/dashboard/DashboardSlice";
import LoaderButton from "./LoaderButton";

export default function TableTopLessee() {
  const { topLessees, topLesseesLoading } = useAppSelector(
    (state) => state.dashboard
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!topLesseesLoading && topLessees.length === 0) {
      dispatch(getTopLesseesAsync());
    }
  }, [topLessees]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark col-span-12 lg:col-span-6">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-blue-gray-50">
        Top Lessees
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5 flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-center text-black dark:text-blue-gray-100">
              Lessee
            </h5>
          </div>
          <div className="p-2.5 flex items-center justify-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-center text-black dark:text-blue-gray-100">
              Total Trip Requested
            </h5>
          </div>
          <div className="p-2.5 flex items-center justify-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base text-center text-black dark:text-blue-gray-100">
              Total Spent
            </h5>
          </div>
        </div>
        {/* Start row  */}
        {topLesseesLoading ? (
          <div className="w-full h-20">
            <LoaderButton />
          </div>
        ) : (
          <>
            {topLessees.map((lessee, index) => (
              <div
                className="grid grid-cols-3 border-b border-stroke dark:border-strokedark"
                key={index}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    <img
                      className="w-9 h-9 object-cover rounded-md"
                      src={lessee.avatar}
                      alt="avatar"
                    />
                  </div>
                  <p className="hidden text-black dark:text-blue-gray-50 sm:block line-clamp-2">
                    {lessee.fullName}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-blue-gray-50">
                    {lessee.totalTripRequested.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {lessee.totalSpent.toLocaleString()} đ
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

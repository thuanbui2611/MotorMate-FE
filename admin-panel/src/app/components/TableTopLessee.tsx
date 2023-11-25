export default function TableTopLessee() {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark col-span-6">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Lessees
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lessee
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Amount Vehicle Rented
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Spent
            </h5>
          </div>
        </div>
        {/* Start row  */}
        <div className="grid grid-cols-3 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
              <img src="../assets/images/brand/brand-01.svg" alt="Brand" />
            </div>
            <p className="hidden text-black dark:text-white sm:block">Google</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">35</p>
          </div>

          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-meta-3">$5,768</p>
          </div>
        </div>
      </div>
    </div>
  );
}

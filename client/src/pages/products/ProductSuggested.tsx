import { useState, useEffect } from "react";
import Loading from "../../app/components/Loading";
import { Vehicle } from "../../app/models/Vehicle";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/ConfigureStore";
import ProductCarousel from "../../app/components/ProductCarousel";

interface Props {
  vehicle: Vehicle;
}
export default function ProductSuggested({ vehicle }: Props) {
  const [loading, setLoading] = useState(true);
  const [productsSuggested, setProductsSuggested] = useState<Vehicle[]>([]);
  const userLogin = useAppSelector((state) => state.account.userDetail);

  useEffect(() => {
    agent.Vehicle.getRelatedVehicles(vehicle.id).then((data) => {
      setProductsSuggested(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  return (
    <>
      {/* <!-- Card Blog --> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Title --> */}
        <div className="max-w-2xl text-center mx-auto ">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Related
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Browse our collection of Relevant Motor
          </p>
        </div>
        {/* <!-- End Title --> */}

        {/* <!-- Grid --> */}
        <div>
          <ProductCarousel userLogin={userLogin} products={productsSuggested} />
        </div>

        {/* <!-- End Grid --> */}

        {/* <!-- Card --> */}
        <div className="text-center">
          <div className="inline-block bg-white border shadow-sm rounded-full dark:bg-slate-900 dark:border-gray-800">
            <div className="py-3 px-4 flex items-center gap-x-2">
              <p className="text-gray-600 dark:text-gray-400">
                Want to see more?
              </p>
              <a
                className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                href="/products"
              >
                Go here
                <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Card Blog --> */}
    </>
  );
}

import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { getRevenueInYearAsync } from "../../pages/dashboard/DashboardSlice";
import LoaderButton from "./LoaderButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

export default function ChartTotalRevenue() {
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: "Total Revenue",
        data: [],
      },
      {
        name: "Total Completed Rentals",
        data: [],
      },
    ],
  });
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const { revenueInYear, revenueInYearLoading } = useAppSelector(
    (state) => state.dashboard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!revenueInYearLoading && revenueInYear === null) {
      dispatch(getRevenueInYearAsync(selectedYear.toString()));
    }
  }, []);

  useEffect(() => {
    if (!revenueInYearLoading) {
      dispatch(getRevenueInYearAsync(selectedYear.toString()));
    }
  }, [selectedYear]);

  useEffect(() => {
    debugger;
    if (revenueInYear) {
      const revenueData = Object.values(
        revenueInYear.TotalRevenue.totalRevenue.months
      );
      const completedTripData = Object.values(
        revenueInYear.totalRentedAndCompletedVehicles.totalCompletedTrip.months
      );
      setState({
        series: [
          {
            name: "Total Revenue",
            data: revenueData,
          },
          {
            name: "Total Completed Rentals",
            data: completedTripData,
          },
        ],
      });
      options.yaxis = {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: Math.max(...revenueData),
      };

      setSelectedYear(revenueInYear.TotalRevenue.totalRevenue.year);
    }
  }, [revenueInYear]);

  function convertToYearRange(yearString: string) {
    const year = parseInt(yearString);
    // Create the start date of the year
    const startDate = new Date(year, 0, 1);
    const startDay = startDate.getDate(); // Get the day of the start date
    const startMonth = startDate.getMonth() + 1; // Get the month of the start date (+1 because January is 0-indexed)
    const startDateFormatted = `${startDay
      .toString()
      .padStart(2, "0")}/${startMonth
      .toString()
      .padStart(2, "0")}/${yearString}`;

    // Create the end date of the year
    const endDate = new Date(year, 11, 31);
    const endDay = endDate.getDate(); // Get the day of the end date
    const endMonth = endDate.getMonth() + 1; // Get the month of the end date (+1 because January is 0-indexed)
    const endDateFormatted = `${endDay.toString().padStart(2, "0")}/${endMonth
      .toString()
      .padStart(2, "0")}/${yearString}`;

    const result = `${startDateFormatted} - ${endDateFormatted}`;
    return result;
  }

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const options = [];

    for (let year = currentYear; year >= startYear; year--) {
      options.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return options;
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-[200px]">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">
                {revenueInYear &&
                  convertToYearRange(
                    revenueInYear.TotalRevenue.totalRevenue.year.toString()
                  )}
              </p>
            </div>
          </div>
          <div className="flex min-w-[220px]">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">
                Total Completed Rentals
              </p>
              <p className="text-sm font-medium">
                {revenueInYear &&
                  convertToYearRange(
                    revenueInYear.totalRentedAndCompletedVehicles.totalCompletedTrip.year.toString()
                  )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md p-1.5">
            <select
              className="bg-gray-50 border border-gray-300 bg-white dark:bg-graydark text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              <option selected disabled>
                Year
              </option>
              {renderYearOptions()}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          {revenueInYearLoading ? (
            <div className="w-full h-30">
              <LoaderButton />
            </div>
          ) : (
            <ReactApexChart
              options={options}
              series={state.series}
              type="area"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
}

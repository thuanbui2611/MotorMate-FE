import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { getTotalViewsInMonthAsync } from "../../pages/dashboard/DashboardSlice";
import LoaderButton from "./LoaderButton";

interface ChartVistorAnylyzeState {
  series: { data: number[] }[];
}

export default function ChartVistorAnalyze() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [state, setState] = useState<ChartVistorAnylyzeState>({
    series: [
      {
        data: [],
      },
    ],
  });

  const [options, setOptions] = useState<ApexOptions>({
    colors: ["#3C50E0"],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Days",
      },
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: {
        text: "Visitors",
      },
    },

    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      // y: {
      //   formatter: function (val) {
      //     return val;
      //   },
      // },
    },
  });

  const { totalViewsInMonth, totalViewsInMonthLoading } = useAppSelector(
    (state) => state.dashboard
  );
  const dispatch = useAppDispatch();
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

  const renderMonthOptions = () => {
    const options = [];
    for (let month = 1; month <= 12; month++) {
      options.push(
        <option key={month} value={month}>
          {month}
        </option>
      );
    }
    return options;
  };

  useEffect(() => {
    if (!totalViewsInMonthLoading && totalViewsInMonth === null) {
      dispatch(
        getTotalViewsInMonthAsync({ year: selectedYear, month: selectedMonth })
      );
    }
  }, []);

  useEffect(() => {
    if (!totalViewsInMonthLoading && totalViewsInMonth !== null) {
      dispatch(
        getTotalViewsInMonthAsync({ year: selectedYear, month: selectedMonth })
      );
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (totalViewsInMonth) {
      debugger;
      const dataViews: number[] = Object.values(
        totalViewsInMonth.totalViews.days
      );
      const days = Object.keys(totalViewsInMonth.totalViews.days);
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: days,
        },
      }));
      setState({
        series: [
          {
            data: dataViews,
          },
        ],
      });
    }
  }, [totalViewsInMonth]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-blue-gray-50">
          Visitors Analytics
        </h3>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md p-1.5">
            <select
              className="bg-gray-50 border border-gray-300 bg-white dark:bg-graydark text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option selected disabled>
                Month
              </option>
              {renderMonthOptions()}
            </select>
          </div>
          <div className="inline-flex items-center rounded-md p-1.5">
            <select
              className="bg-gray-50 border border-gray-300 bg-white dark:bg-graydark text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-gray-50 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          {totalViewsInMonthLoading ? (
            <div className="w-full h-[350px] flex items-center justify-center">
              <LoaderButton />{" "}
            </div>
          ) : (
            <ReactApexChart
              series={state.series}
              options={options}
              type="bar"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
}

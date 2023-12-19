import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";

interface ChartVistorAnylyzeState {
  series: { data: number[] }[];
}

export default function ChartVistorAnalyze() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [state, setState] = useState<ChartVistorAnylyzeState>({
    series: [
      {
        data: [
          168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212,
          270, 190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290,
          380, 312,
        ],
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
      categories: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-blue-gray-50">
          Visitors Analytics
        </h3>
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

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

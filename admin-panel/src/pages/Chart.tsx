import Breadcrumb from "../app/components/Breadcrumb";
import ChartFour from "../app/components/ChartVistorAnalyze";
import ChartThree from "../app/components/ChartThree";
import ChartTwo from "../app/components/ChartTwo";
import ChartTotalRevenue from "../app/components/ChartTotalRevenue";

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartTotalRevenue />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;

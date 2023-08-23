import Breadcrumb from "../app/components/Breadcrumb";
import ChartFour from "../app/components/ChartFour";
import ChartOne from "../app/components/ChartOne";
import ChartThree from "../app/components/ChartThree";
import ChartTwo from "../app/components/ChartTwo";

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;

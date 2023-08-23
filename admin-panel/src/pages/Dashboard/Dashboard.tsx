import CardFour from "../../app/components/CardFour";
import CardOne from "../../app/components/CardOne";
import CardThree from "../../app/components/CardThree";
import CardTwo from "../../app/components/CardTwo";
import ChartOne from "../../app/components/ChartOne";
import ChartThree from "../../app/components/ChartThree";
import ChartTwo from "../../app/components/ChartTwo";
import ChatCard from "../../app/components/ChatCard";
import MapOne from "../../app/components/MapOne";
import TableOne from "../../app/components/TableOne";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default Dashboard;

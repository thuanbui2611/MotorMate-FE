import { useEffect, useState } from "react";
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
import { set } from "react-hook-form";

const Dashboard = () => {
  const [ipAddress, setIPAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  // useEffect(() => {
  //   fetch("https://geolocation-db.com/json/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setIPAddress(data.IPv4);
  //       setCountry(data.country_name);
  //       fetch(`https://geolocation-api-example.com/api?ip=${data.IPv4}`).then(
  //         (data) => {
  //           console.log(data);
  //         }
  //       );
  //     })
  //     .catch((error) => console.log(error));
  // }, []);
  // useEffect(() => {
  //   fetch(
  //     "https://geo.ipify.org/api/v2/country?apiKey=at_8prWVUXkvrHgaDBafQnoxLKXDX7AV&ipAddress=116.110.41.88"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      {/* <div className="bg-black text-white">
        {" "}
        <p>Your IP Address is: {ipAddress}</p>
        <p>Your country is: {country}</p>
      </div> */}
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

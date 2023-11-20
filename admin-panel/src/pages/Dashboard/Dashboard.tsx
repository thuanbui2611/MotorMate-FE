import { ChangeEvent, useEffect, useState } from "react";
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
import { recognizeIdentityCard } from "../../app/utils/IDRecognition";

const Dashboard = () => {
  const [ipAddress, setIPAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetch(
  //       "https://ipgeolocation.abstractapi.com/v1/?api_key=c886e37f754842e5b6d4cf0375b326da"
  //     )
  //       .then((response) => response.json())
  //       .then((response) => console.log(response))
  //       .catch((err) => console.error(err));
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (!selectedFile) return;
    debugger;
    await recognizeIdentityCard(selectedFile);
  };
  //
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      <div className="bg-black text-white"></div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <div className="bg-red-600 w-90 h-90">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Submit</button>
        </div> */}
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

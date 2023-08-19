import { useEffect, useState } from "react";
import { City, District, Ward } from "../models/Address";

export default function SelectCityVN() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    // Load data from data.json file

    fetch("/dataCityVN.json")
      .then((response) => response.json())
      .then((data: City[]) => {
        console.log("Data");
        console.log(data);
        setCities(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    if (cityId === "") {
      setDistricts([]);
      setWards([]);
    }
    setSelectedCity(cityId);

    const selectedCityData = cities.find((city) => city.Id === cityId);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts);
      setSelectedDistrict("");
      setWards([]);
    }
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = event.target.value;
    if (districtId === "") {
      setWards([]);
    }
    setSelectedDistrict(districtId);

    const selectedDistrictData = districts.find(
      (district) => district.Id === districtId
    );
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards);
    }
  };
  return (
    <>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Select your address
      </label>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 -mr-10"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">Choose a city</option>
            {cities.map((city) => (
              <option key={city.Id} value={city.Id}>
                {city.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedCity}
          >
            <option value="">Choose a district</option>
            {districts.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            disabled={!selectedDistrict.length}
          >
            <option value="">Choose a wards</option>
            {wards.map((ward) => (
              <option key={ward.Id} value={ward.Id}>
                {ward.Name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

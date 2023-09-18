import { useEffect, useState } from "react";
import { City, District, Ward } from "../models/Address";
import { Autocomplete, TextField } from "@mui/material";
import { set } from "react-hook-form";

export default function SelectCityVN() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  useEffect(() => {
    fetch("/dataCityVN.json")
      .then((response) => response.json())
      .then((data: City[]) => {
        console.log(data);
        setCities(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  const handleCityChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: City | null
  ) => {
    const cityId = newValue?.Id;
    if (!cityId) {
      setDistricts([]);
      setWards([]);
    }
    setSelectedCity(newValue);

    const selectedCityData = cities.find((city) => city.Id === cityId);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setWards([]);
    }
  };

  const handleDistrictChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: District | null
  ) => {
    const districtId = newValue?.Id;
    if (!districtId) {
      setWards([]);
    }
    setSelectedDistrict(newValue);

    const selectedDistrictData = districts.find(
      (district) => district.Id === districtId
    );
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards);
    }
  };

  const handleWardChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Ward | null
  ) => {
    setSelectedWard(newValue);
  };
  return (
    <div className="w-full flex flex-col gap-3">
      <Autocomplete
        disablePortal
        size="small"
        value={selectedCity}
        options={cities}
        getOptionLabel={(city) => city.Name}
        onChange={(event, newValue) => handleCityChange(event, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            InputProps={{
              ...params.InputProps,
            }}
            // {...register("cityId", {
            //   required: "City is required",
            // })}
            // error={!!errors.cityId}
            // helperText={errors?.cityId?.message as string}
          />
        )}
      />

      <Autocomplete
        disablePortal
        size="small"
        disabled={!selectedCity}
        value={selectedDistrict}
        options={districts}
        getOptionLabel={(district) => district.Name}
        onChange={(event, newValue) => handleDistrictChange(event, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="District"
            // {...register("districtId", {
            //   required: "District is required",
            // })}
            // error={!!errors.districtId}
            // helperText={errors?.districtId?.message as string}
          />
        )}
      />
      <Autocomplete
        disablePortal
        size="small"
        disabled={!selectedDistrict}
        value={selectedWard}
        options={wards}
        getOptionLabel={(ward) => ward.Name}
        onChange={(event, newValue) => handleWardChange(event, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wards"
            // {...register("districtId", {
            //   required: "District is required",
            // })}
            // error={!!errors.districtId}
            // helperText={errors?.districtId?.message as string}
          />
        )}
      />
    </div>
  );
}

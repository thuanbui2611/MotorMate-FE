import { useEffect, useState } from "react";
import { City, District, Ward } from "../models/Address";
import { Autocomplete, TextField } from "@mui/material";

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
    fetch("./dataCityVN.json")
      .then((response) => response.json())
      .then((data: City[]) => {
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
      setSelectedDistrict(null);
      setSelectedWard(null);
      setWards([]);
    }
    setSelectedCity(newValue);

    const selectedCityData = cities.find((city) => city.Id === cityId);
    if (selectedCityData) {
      setDistricts(
        selectedCityData.Districts.sort((a: District, b: District) =>
          sortString(a.Name, b.Name)
        )
      );
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
      setSelectedWard(null);
      setWards([]);
    }
    setSelectedDistrict(newValue);

    const selectedDistrictData = districts.find(
      (district) => district.Id === districtId
    );
    if (selectedDistrictData) {
      setSelectedWard(null);
      setWards(
        selectedDistrictData.Wards.sort((a: Ward, b: Ward) =>
          sortString(a.Name, b.Name)
        )
      );
    }
  };

  const handleWardChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: Ward | null
  ) => {
    setSelectedWard(newValue);
  };

  const sortString = (a: string, b: string) => {
    const regex = /(\D+)(\d+)?/;
    const [, aText, aNumber] = a.match(regex) || [];
    const [, bText, bNumber] = b.match(regex) || [];
    // Sort by alphabetic order first
    const compareAlphabetic = aText.localeCompare(bText);
    if (compareAlphabetic !== 0) {
      return compareAlphabetic;
    }
    // Sort by numeric value if available
    if (aNumber && bNumber) {
      return Number(aNumber) - Number(bNumber);
    }
    // Sort other strings
    return a.localeCompare(b);
  };
  return (
    <>
      <Autocomplete
        fullWidth={true}
        disablePortal
        size="small"
        value={selectedCity}
        options={cities.sort((a: City, b: City) => sortString(a.Name, b.Name))}
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
        fullWidth={true}
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
            className={`${!selectedCity && "bg-gray-200 rounded-md"}`}
            // {...register("districtId", {
            //   required: "District is required",
            // })}
            // error={!!errors.districtId}
            // helperText={errors?.districtId?.message as string}
          />
        )}
      />
      <Autocomplete
        fullWidth={true}
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
            className={`${!selectedDistrict && "bg-gray-200 rounded-md"}`}
            // {...register("districtId", {
            //   required: "District is required",
            // })}
            // error={!!errors.districtId}
            // helperText={errors?.districtId?.message as string}
          />
        )}
      />
    </>
  );
}

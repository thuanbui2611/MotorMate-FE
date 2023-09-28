import { useEffect, useState } from "react";
import { City, District, Location, Ward } from "../models/Address";
import { Autocomplete, TextField } from "@mui/material";

interface Props {
  defaultLocation?: Location | null;
  onSelect: (value: Location) => void;
}

export default function SelectCityVN({ onSelect, defaultLocation }: Props) {
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
  useEffect(() => {
    //Check default value and set to selected value
    if (defaultLocation && cities.length > 0) {
      const defaultCity = cities.find(
        (city) =>
          city.Name.toLowerCase().trim() ===
          defaultLocation.city.toLowerCase().trim()
      );
      setSelectedCity(defaultCity || null);
      const defaultDistrict = defaultCity?.Districts.find(
        (district) =>
          district.Name.toLowerCase().trim() ===
          defaultLocation.district.toLowerCase().trim()
      );
      setSelectedDistrict(defaultDistrict || null);
      const defaultWard = defaultDistrict?.Wards.find(
        (ward) =>
          ward.Name.toLowerCase().trim() ===
          defaultLocation.ward.toLowerCase().trim()
      );
      setSelectedWard(defaultWard || null);
    }
  }, [defaultLocation, cities]);

  useEffect(() => {
    //return value to parent component when selectedWard change
    if (selectedWard?.Name && selectedCity?.Name && selectedDistrict?.Name) {
      let location: Location = {
        city: selectedCity.Name,
        ward: selectedWard.Name,
        district: selectedDistrict.Name,
      };
      onSelect(location);
    }
  }, [selectedWard]);

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

  // const handleLocationChange = (event: any)=>{

  // }
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
            className={`${!selectedCity && "bg-blue-gray-50 rounded-md"}`}
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
            className={`${!selectedDistrict && "bg-blue-gray-50 rounded-md"}`}
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

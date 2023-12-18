import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
interface Props {
  onSelectPageSize: (pageSize: number) => void;
  defaultValue?: number;
}
export default function SelectPageSize({
  onSelectPageSize,
  defaultValue,
}: Props) {
  const [selectedPageSize, setSelectedPageSize] = useState<string>("5");

  const pageSizeOptions: string[] = ["5", "10", "20"];

  useEffect(() => {
    if (defaultValue) {
      setSelectedPageSize(defaultValue.toString());
    }
  }, [defaultValue]);
  const handleChange = (event: any, newValue: string | null) => {
    if (!newValue) return;
    const valueNumber = +newValue;
    if (!isNaN(valueNumber) && valueNumber >= 1) {
      setSelectedPageSize(valueNumber.toString());
      onSelectPageSize(valueNumber);
    }
  };

  return (
    <div className="flex items-center justify-center text-center">
      <Autocomplete
        className="font-normal text-center w-10 rounded-md"
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            padding: "0px!important",
            textAlign: "center",
          },
          "& .MuiAutocomplete-popper": {
            textAlign: "left",
            padding: "0px!important",
          },
        }}
        freeSolo
        options={pageSizeOptions}
        value={selectedPageSize}
        onChange={(event, newValue) => {
          handleChange(event, newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "0px!important",
              },
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
            }}
          />
        )}
        clearIcon={null}
      />
    </div>
  );
}

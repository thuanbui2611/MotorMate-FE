import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

interface Props {
  onSelectPageSize: (pageSize: number) => void;
}
export default function SelectPageSize({ onSelectPageSize }: Props) {
  const [selectedPageSize, setSelectedPageSize] = useState<number>(5);

  const numOfPageSizes: number[] = [5, 10, 20, 30, 40, 50];

  const handleChange = (event: any) => {
    const newValue = parseInt(event.target.value);

    if (!isNaN(newValue) && newValue >= 1) {
      setSelectedPageSize(newValue);
    }
  };

  useEffect(() => {
    onSelectPageSize(selectedPageSize);
  }, [selectedPageSize]);

  return (
    <div className="flex items-center justify-center text-center">
      <input
        className="font-normal text-center w-10 border border-gray-300 rounded-md bg-white"
        onChange={(event) => handleChange(event)}
        value={selectedPageSize}
        type="number"
      />
    </div>
  );
}

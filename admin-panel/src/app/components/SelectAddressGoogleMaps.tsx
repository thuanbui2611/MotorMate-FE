import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

export default function SelectAddressGoogleMaps() {
  const [defaultAddress, setDefaultAddress] = useState<string>("");

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const handleAddressSelect = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    const address: any = autocompleteRef.current;
    const fullAddress = address.gm_accessors_.place.em.formattedPrediction;
    if (!place) {
      toast.error("Please select a valid address");
      return;
    }
    const { place_id } = place;
    debugger;

    // Validate the place_id to ensure it is a valid selection
    if (place_id) {
    } else {
      toast.error("Please select a valid address");
    }
  };
  return (
    <>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handleAddressSelect}
      >
        <TextField
          size="small"
          type="text"
          defaultValue={defaultAddress}
          placeholder="House number, street name..."
        />
      </Autocomplete>
    </>
  );
}

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

interface Props {
  originLocation: string | undefined;
  destinationLocation: string | undefined;
  onClose: () => void;
}

export default function MapsDialog({
  onClose,
  originLocation,
  destinationLocation,
}: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const center = { lat: 10.823099, lng: 106.629662 };

  async function calculateRoute() {
    debugger;
    if (!map || !originRef.current || !destinationRef.current) return;

    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance?.text as string);
    setDuration(result.routes[0].legs[0].duration?.text as string);
  }

  useEffect(() => {
    if (map && originLocation && destinationLocation) {
      calculateRoute();
    }
  }, [map]);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen z-50 bg-black bg-opacity-30 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div
        className="flex items-center justify-center h-[60%] w-[90%] md:h-[80%] md:w-[80%] lg:h-[47vw] lg:w-[82vw] xl:h-[44vw] xl:w-[80vw] max-w-screen-xl max-h-screen "
        style={{ zIndex: 99 }}
      >
        <GoogleMap
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </GoogleMap>
      </div>
      <div
        className="absolute top-2 bg-white w-fit px-8 py-2 grid gap-2 items-center justify-center shadow-lg border border-gray-300 rounded-md"
        style={{ zIndex: 9999 }}
      >
        <div className="flex items-center justify-center gap-2">
          <p className="text-white bg-red-600 rounded-full text-sm flex items-center justify-center h-6 w-6">
            A
          </p>
          <Autocomplete>
            <input
              className="w-[70vw] text-xs sm:w-[500px] sm:text-sm"
              type="text"
              placeholder="Origin"
              defaultValue={originLocation}
              ref={originRef}
            />
          </Autocomplete>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-white bg-red-600 rounded-full text-sm flex items-center justify-center h-6 w-6">
            B
          </p>
          <Autocomplete>
            <input
              className="w-[70vw] text-xs sm:w-[500px] sm:text-sm"
              type="text"
              placeholder="Destination"
              defaultValue={destinationLocation}
              ref={destinationRef}
            />
          </Autocomplete>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-col gap-2">
            <p className="text-xs sm:text-sm font-semibold">
              Distance: {distance}
            </p>
            <p className="text-xs sm:text-sm font-semibold">
              Duration: {duration}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-full bg-orange-based px-1 py-0 sm:px-2 sm:py-1 text-xs sm:text-sm hover:bg-orange-based/80 font-semibold"
              onClick={calculateRoute}
            >
              Caculate Route
            </button>
            <button
              className="rounded-full p-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
              onClick={() => map?.panTo(center)}
            >
              <svg
                fill="#000000"
                width="18px"
                height="18px"
                viewBox="0 0 32.00 32.00"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M25.497 6.503l.001-.003-.004.005L3.5 15.901l11.112 1.489 1.487 11.11 9.396-21.992.005-.006z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

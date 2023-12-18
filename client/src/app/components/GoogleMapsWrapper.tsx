import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface GoogleMapsWrapperProps {
  children: React.ReactNode;
}

export default function GoogleMapsWrapper({
  children,
}: GoogleMapsWrapperProps) {
  const [shouldRender, setShouldRender] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
    language: "vi",
    region: "VN",
  });

  useEffect(() => {
    if (isLoaded) {
      setShouldRender(true);
    }
  }, [isLoaded]);

  return shouldRender ? <>{children}</> : null;
}

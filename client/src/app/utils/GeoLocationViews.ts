import agent from "../api/agent";

export async function addViews() {
  let ipLocation: any;
  try {
    let permissionFetch: boolean = false;
    const viewLocalStore = JSON.parse(localStorage.getItem("view")!);
    if (viewLocalStore) {
      //Check time if go to another day
      if (viewLocalStore.isLimit) {
        const currentDate = new Date();
        const viewLocalStoreDate = new Date(viewLocalStore.date);
        const isSameDay =
          currentDate.getUTCDate() === viewLocalStoreDate.getUTCDate() &&
          currentDate.getUTCMonth() === viewLocalStoreDate.getUTCMonth() &&
          currentDate.getUTCFullYear() === viewLocalStoreDate.getUTCFullYear();
        permissionFetch = !isSameDay;
      } else {
        permissionFetch = true;
      }
    } else {
      permissionFetch = true;
    }
    if (!permissionFetch) return;
    const response = await fetch(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_GEO_LOCATION_API_KEY}`
    );
    const data = await response.json();
    ipLocation = data;
    console.log("ipLocation:", ipLocation);
  } catch (error) {
    console.log("Error when get ip location:", error);
  }

  try {
    if (ipLocation) {
      const viewsRequest = {
        continent: ipLocation.continent,
        continentGeoNameId: ipLocation.continent_geoname_id.toString(),
        country: ipLocation.country,
        countryCode: ipLocation.country_code,
        countryGeoNameId: ipLocation.geoname_id,
        ipAddress: ipLocation.ip_address,
        latitude: ipLocation.latitude.toString(),
        longtitude: ipLocation.longitude.toString(),
        region: ipLocation.region,
        regionGeoNameId: ipLocation.region_geoname_id.toString(),
      };
      
      const result = await agent.Utilities.addView(viewsRequest);
      if (result) {
        const viewLocalStore = {
          ...result.viewProperties,
          date: new Date().toISOString(),
        };
        localStorage.setItem("view", JSON.stringify(viewLocalStore));
      } 
    }
  } catch (error: any) {
    console.log("Error when add views:", error);
    if(error.data.statusCode === 409)
    {
      const viewLocalStore = {
        isLimit: true,
        totalViewCountInToday: 5,
        date: new Date().toISOString(),
      };
      localStorage.setItem("view", JSON.stringify(viewLocalStore));
    } 
    
  }
}

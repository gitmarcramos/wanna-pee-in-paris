import React, { useState } from "react";
import "./GeoDataResults.css";

//components
import Loader from "../Loader/Loader";

export default function GeoDataResults(props) {
  //Get the geolocation
  const [userGeoLocation, setUserGeoLocation] = useState({
    longitude: props.coordinates.longitude,
    latitude: props.coordinates.latitude,
  });


  //! Here trying to manage the geolocation, but not working with only the button because it needs to have a REAL arrondissement to avoid empty array in results
  const [filteredGeoloc, setFilteredGeoloc] = useState("");
  // setFilteredGeoloc(
  //   "&geofilter.distance=48.83871566436789%2C+2.2972791029868063%2C500"
  // );

  // useEffect(() => {
  //   setUserGeoLocation({
  //     longitude: props.geoData.longitude,
  //     latitude: props.geoData.latitude,
  //   });
  // }, []);


  return (
    <div className="geoDataResults">
      <Loader />
      <iframe src="https://api.openstreetmap.org/#map=19/48.83860/2.29841" width="400" height="300" frameborder="0"></iframe>
    </div>
  );
}

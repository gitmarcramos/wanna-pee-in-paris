import React, { useState, useEffect } from "react";
import "./App.css";
// Components
import Search from "./Components/Search/Search";
import SearchResults from "./Components/SearchResults/SearchResults";
// Images
import Logo from "./Components/Logo/logo.svg";
import Illustration from "./Components/Illustration/Illustration.svg";

function App() {
  const [appArrondissement, setAppArrondissement] = useState(null);
  // const [appArrondissement, setAppArrondissement] = useState(75015);

  //Get arrondissement from the Search Component
  const getArr = (data) => {
    setAppArrondissement(data);
  };

  const resetArrondissement = () => {
    setAppArrondissement(null);
  };

  // State geolocation
  const [appGeolocation, setAppGeolocation] = useState({
    latitude: null,
    longitude: null,
  });

  // Get geolocation from te Search Component
  const getGeolocate = (geoData) => {
    setAppGeolocation(geoData);
  };

  return (
    <div className="App">
      <img src={Logo} className="logo" alt="Wanna Pee in Paris Logo" />
      <img
        src={Illustration}
        className="illustration"
        alt="Home page illustration"
      />
      {appArrondissement === null && (
        <Search getArr={getArr} getGeolocate={getGeolocate} />
      )}
      {appArrondissement && (
        <SearchResults data={appArrondissement} reset={resetArrondissement} geoData={appGeolocation}/>
      )}
    </div>
  );
}

export default App;

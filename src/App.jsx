import React, { useState, useEffect } from "react";
import "./App.css";
// Components
import Search from "./Components/Search/Search";
import SearchResults from "./Components/SearchResults/SearchResults";
import IconMenu from "./Components/IconMenu/IconMenu";
import GeoDataResults from "./Components/GeoDataResults/GeoDataResults";
// Images
import Logo from "./Components/Logo/logo.svg";
import Illustration from "./Components/Illustration/Illustration.svg";

function App() {
  const [appArrondissement, setAppArrondissement] = useState(null);

  //Get arrondissement from the Search Component
  const getArr = (data) => {
    setAppArrondissement(data);
  };

  const resetArrondissement = () => {
    setAppArrondissement(null);
    setAppGeolocation({ latitude: null, longitude: null });
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

  // For checking screen width
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <>
      {width > 500 ? (
        <div className="mobile-check">
          <h1 className="body">
            Ce site Internet est accessible uniquement sur mobile
          </h1>
        </div>
      ) : (
        <div className="App">
          <img
            src={Logo}
            className="logo"
            alt="Wanna Pee in Paris Logo"
            onClick={resetArrondissement}
          />
          <img
            src={Illustration}
            className="illustration"
            alt="Home page illustration"
          />
          <IconMenu />
          {/* The search appears only if Arrondissement or Geolocation are null */}
          {(appArrondissement === null && appGeolocation.latitude === null) && (
            <Search getArr={getArr} getGeolocate={getGeolocate} />
          )}
          {/* Search results for arrondissements */}
          {appArrondissement && (
            <SearchResults
              data={appArrondissement}
              reset={resetArrondissement}
              geoData={appGeolocation}
            />
          )}
          {/* Searc Results for geolocation */}
          {appGeolocation.latitude && (
            <GeoDataResults coordinates={appGeolocation} />
          )}
        </div>
      )}
    </>
  );
}

export default App;

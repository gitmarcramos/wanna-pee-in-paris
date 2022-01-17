import React, { useState, useEffect } from "react";
import "./App.css";
// Components
import Search from "./Components/Search/Search";
import SearchResults from "./Components/SearchResults/SearchResults";
import IconMenu from "./Components/IconMenu/IconMenu";
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
          {appArrondissement === null && (
            <Search getArr={getArr} getGeolocate={getGeolocate} />
          )}
          {(appGeolocation.latitude || appArrondissement) && (
            <SearchResults
              data={appArrondissement}
              reset={resetArrondissement}
              geoData={appGeolocation}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;

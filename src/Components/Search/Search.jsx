import React from "react";
import { useState, useEffect } from "react";
import "./Search.css";

//import components
import ErrorMsg from "../ErrorMsg/ErrorMsg";

export default function Search(props) {
  // Input to choose arrondissement
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.currentTarget.value);
  };

  //Arrondissements
  const [arrondissement, setArrondissement] = useState(null);

  // for Arrondissements check
  const arrArrondissements = [
    "75001",
    "75002",
    "75003",
    "75004",
    "75005",
    "75006",
    "75007",
    "75008",
    "75009",
    "75010",
    "75011",
    "75012",
    "75013",
    "75014",
    "75015",
    "75016",
    "75017",
    "75018",
    "75019",
    "75020",
  ];

  const handleArrondissement = () => {
    if (arrArrondissements.includes(input)) {
      setArrondissement(input);
      setInput("");
    }
  };

  // State of user geolocation
  const [geoLocate, setGeolocate] = useState({
    latitude: null,
    longitude: null,
  });

  //handle geolocation denied
  const [errorGeoloc, setErrorGeoloc] = useState(false);

  // Handler to get user geolocation when click on button
  const handleGeoLocate = async () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setGeolocate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      function (error) {
        if (error.code == error.PERMISSION_DENIED) setErrorGeoloc(true);
      }
    );
  };

  //Sends the arrondissement to the App
  useEffect(() => {
    props.getArr(arrondissement);
    props.getGeolocate(geoLocate);
  }, [arrondissement, geoLocate]);

  //handle input errors
  const [errors, setErrors] = useState(false);
  const checkErrors = () => {
    if (
      isNaN(input) ||
      input.length !== 5 ||
      !arrArrondissements.includes(input)
    ) {
      setErrors(true);
    }
  };

  const checkAllErrors = () => {
    handleArrondissement();
    checkErrors();
    setInput("");
  };

  return (
    <div className="main-search container">
      <h1 className="body">
        Trouvez facilement des toilettes publiques à Paris ! 
      </h1>
      <div className="search-options">

      <button className="button button--main" onClick={handleGeoLocate}>
          Géolocalisez-moi !
        </button>
        {errorGeoloc ? (
          <ErrorMsg msg="La geolocalisation n'est pas activée sur votre navigateur" />
        ) : null}

        <span className="body-min">ou</span>

        <div className="search-bar">
          <input
            type="text"
            pattern="[0-9]*"
            className="search-input"
            onInput={handleInput}
            value={input}
            placeholder="Exemple : 75015"
          />

          <button className="button button--search" onClick={checkAllErrors}>
            Go !
          </button>
        </div>
        {errors && (
          <ErrorMsg msg="Veuillez entrer un arrondissement de Paris entre 75001 et 75020" />
        )}


        
      </div>
    </div>
  );
}

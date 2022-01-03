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

  // Handler to get user geolocation when click on button
  const handleGeoLocate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeolocate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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
      <h1 className="body">Dans quel arrondissement cherchez-vous ?</h1>
      <div className="search-options">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            onInput={handleInput}
            value={input}
          />

          <button
            className="button button--search"
            // onClick={handleArrondissement}
            onClick={checkAllErrors}
          >
            Go !
          </button>
        </div>
        {errors && (
          <ErrorMsg msg="Veuillez entrer un arrondissement de Paris entre 75001 et 75020" />
        )}

        {/* TO put back when reverse geocoding */}
        {/* <span className="body-min">ou</span>
        <button className="button button--main" onClick={handleGeoLocate}>
          Géolocalisez-moi !
        </button> */}
      </div>
    </div>
  );
}

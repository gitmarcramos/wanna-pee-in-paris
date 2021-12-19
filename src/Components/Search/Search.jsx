import React from "react";
import { useState, useEffect } from "react";
import "./Search.css";

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
    if (isNaN(input) || !arrArrondissements.includes(input)) {
      alert("Veuillez entrer un arrondissement de Paris entre 75001 et 75020");
    } else {
      setArrondissement(input);
      setInput("");
    }
  };

  //Sends the arrondissement to the App
  useEffect(() => {
    props.getArr(arrondissement);
  }, [arrondissement]);

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
            onClick={handleArrondissement}
          >
            Go !
          </button>
        </div>
        {(input.length > 5 || isNaN(input)) && (
          <ErrorMsg msg="Veuillez entrer un arrondissement de Paris entre 75001 et 75020" />
        )}
        <span className="body-min">ou</span>
        <button className="button button--main">Géolocalisez-moi !</button>
      </div>
    </div>
  );
}

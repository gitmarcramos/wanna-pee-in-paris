import React, { useState, useEffect } from "react";
import "./SearchResults.css";
import Close from "./Close.svg";
import ItemResult from "../ItemResult/ItemResult";
import { v4 as uuidv4 } from "uuid";
import Loader from "../Loader/Loader";

export default function SearchResults(props) {
  // Get the searched arrondissement
  const [searchedArrondissement, setSearchedArrondissement] = useState([]);

  //Filter the search = PMR
  const [pmr, setPMR] = useState("");
  const toggleAccesPMR = (e) => {
    e.currentTarget.checked ? setPMR("&refine.acces_pmr=Oui") : setPMR("");
  };

  // Filter the search = BABY
  const [baby, setBaby] = useState("");
  const toggleAccesBaby = (e) => {
    e.currentTarget.checked ? setBaby("&refine.relais_bebe=Oui") : setBaby("");
  };

  useEffect(async () => {
    try {
      const APIcall = await (
        await fetch(
          "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=100&q=&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&refine.arrondissement=" +
            props.data +
            pmr +
            baby +
            ""
        )
      ).json();
      setSearchedArrondissement(APIcall.records);
    } catch (e) {
      console.error(e);
    }
  }, [pmr, baby]);

  return (
    <>
    <Loader/>
      {searchedArrondissement === undefined ? (
        <Loader/>
      ) : (
        <div className="search-results container">
          {/* results header*/}
          <div className="search-results__data">
            <div className="search-results__data--main">
              <h1 className="title">
                Toilettes publiques dans le {props.data}
              </h1>
              <h2>{searchedArrondissement.length} résultats</h2>
            </div>
            <div className="search-results__data--filter">
              <h3 className="sub">Filtrer</h3>
              <div className="filter-input">
                <div className="filter-input--item">
                  <label htmlFor="acces-pmr" className="body-min">
                    Accès PMR
                  </label>
                  <input
                    type="checkbox"
                    id="acces-pmr"
                    onChange={toggleAccesPMR}
                  />
                </div>
                <div className="filter-input--item">
                  <label htmlFor="relais-bebe" className="body-min">
                    Relais bébé
                  </label>
                  <input
                    type="checkbox"
                    id="relais-bebe"
                    onChange={toggleAccesBaby}
                  />
                </div>
              </div>
            </div>
            <button className="button-link" onClick={props.reset}>
              Nouvelle recherche
            </button>
            <img
              src={Close}
              alt="Close button"
              className="close-svg"
              onClick={props.reset}
            />
          </div>
          {/* results Content */}
          <div className="toilet">
            {searchedArrondissement.map((toilet) => {
              return <ItemResult key={uuidv4()} data={toilet} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

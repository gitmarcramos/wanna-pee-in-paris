import React from "react";
import "./NoToilets.css";

export default function NoToilets(props) {

    console.log(props)
  return (
    <div className="no-toilets">
      <p className="body">
        Désolé, il semble qu'il n'y ai pas de toilettes publiques disponibles
        dans les environs...
      </p>
      <button className="button-link body">
        Nouvelle recherche
      </button>
    </div>
  );
}

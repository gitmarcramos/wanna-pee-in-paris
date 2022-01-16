import React, { useState } from "react";
import "./MenuPage.css";

export default function MenuPage() {
  return (
    <div className="page-menu">
      <div className="about">
        <h2 className="title white">À Propos</h2>
        <p className="body white">
          Wanna Pee in Paris a pour objectif de vous aider à trouver rapidement
          des toilettes publiques dans l’arrondissement Parisien que vous
          renseignez.
        </p>
      </div>
      <div className="credits">
        <h3 className="body white">Crédits</h3>
        <span className="body-min white">
          Design et développement web :{" "}
          <a className="white" href="https://www.marcramos.fr/" target="_blank">
            Marc Ramos
          </a>{" "}
        </span>
        <br />
        <span className="body-min white">
          Image d'illustration :{" "}
          <a
            className="white"
            href="https://www.pablostanley.com/"
            target="_blank"
          >
            Pablo Stanley
          </a>{" "}
        </span>
        <br />
        <br />
        <span className="body-min white">
          <em className="body-min white">Wanna Pee In Paris</em> utilise les données fournies par la démarche <a
            className="white"
            href="https://opendata.paris.fr/pages/home/"
            target="_blank"
          >
            Open Data
          </a> de la Ville de Paris.
        </span>
      </div>
    </div>
  );
}

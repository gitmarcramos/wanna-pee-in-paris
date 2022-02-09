import React, { useState, useEffect } from "react";
import "./ItemResult.css";

//images
import clock from "./clock.svg";
import wheels from "./wheel.svg";
import baby from "./baby.svg";

export default function ItemResult(props) {
  const toilet = props.data;

  const horaires = props.data.fields.horaire || "non spécifié";
  // Get the opening hours in numbers and actual hour
  const [openingHours, setOpeningHours] = useState({
    opening: Number(horaires.split(" ")[0]),
    closing: Number(horaires.split(" ")[3]),
    userHour: new Date().getHours(),
  });

  //set the opening hours of the selected toilets by Geolocation
  useEffect(() => {
    setOpeningHours({
      opening: Number(horaires.split(" ")[0]),
      closing: Number(horaires.split(" ")[3]),
      userHour: new Date().getHours(),
    });
  }, [toilet]);

  // Set the opened hours, to compare with actual hour
  const createInterval = () => {
    let interval = [];

    if (openingHours.closing - openingHours.opening > 0) {
      for (let i = openingHours.opening; i <= openingHours.closing; i++) {
        interval.push(i);
      }
    }

    if (openingHours.closing - openingHours.opening === 0) {
      for (let i = 0; i <= 24; i++) {
        interval.push(i);
      }
    }

    if (openingHours.closing - openingHours.opening < 0) {
      for (let i = openingHours.opening; i <= 24; i++) {
        interval.push(i);
      }
      for (let i = 0; i <= openingHours.closing; i++) {
        interval.push(i);
      }
    }

    if (isNaN(openingHours.opening)) return undefined;
    if (interval.includes(openingHours.userHour)) return true;
    if (!interval.includes(openingHours.userHour)) return false;
  };

  // Variable to check if the toilets are opened or not
  let isOpen = createInterval();

  return (
    <div className="item-result">
      <div className="item-head">
        <h2 className="body-min">Type : {toilet.fields.type}</h2>
        <h4 className="title">
          {toilet.fields.adresse} - {toilet.fields.arrondissement}
        </h4>
        <div className="item-openState">
          <div
            className={
              isOpen === true
                ? "state-indicator open"
                : isOpen === false
                ? "state-indicator closed"
                : "state-indicator maybe"
            }
          ></div>
          <p className="sub">
            {isOpen === true
              ? "Ouvertes en ce moment"
              : isOpen === false
              ? "Fermées en ce moment"
              : "Horaires d'ouvertures indisponibles."}
          </p>
        </div>
      </div>
      <div className="item-result-infos">
        {toilet.fields.horaire === "Voir fiche équipement" ? (
          <div className="item-result-infos--item">
            <img src={clock} alt="Icone des horaires" />
            <a
              href={toilet.fields.url_fiche_equipement}
              className="body-min"
              target="_blank"
            >
              Voir les horaires
            </a>
          </div>
        ) : (
          <>
            {!toilet.fields.horaire ? (
              <div className="item-result-infos--item">
                <img
                  src={clock}
                  alt="Icone des horaires"
                  className="disabled"
                />
                <h5 className="body-min">Non spécifié</h5>
              </div>
            ) : (
              <div className="item-result-infos--item">
                <img src={clock} alt="Icone des horaires" />
                <h5 className="body-min">{toilet.fields.horaire}</h5>
              </div>
            )}
          </>
        )}

        {toilet.fields.acces_pmr === "Oui" ? (
          <div className="item-result-infos--item">
            <img src={wheels} alt="Icon d'accès PMR" />
            <h5 className="body-min">Accès PMR</h5>
          </div>
        ) : (
          <div className="item-result-infos--item disabled">
            <img src={wheels} alt="Icon d'accès PMR" />
            <h5 className="body-min">Accès PMR</h5>
          </div>
        )}

        {toilet.fields.relais_bebe && toilet.fields.relais_bebe === "Oui" ? (
          <div className="item-result-infos--item">
            <img src={baby} alt="Icon de relais bébé" />
            <h5 className="body-min">Relais bébé</h5>
          </div>
        ) : (
          <div className="item-result-infos--item disabled">
            <img src={baby} alt="Icon de relais bébé" />
            <h5 className="body-min">Relais bébé</h5>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "./ItemResult.css";

//images
import clock from "./clock.svg";
import wheels from "./wheel.svg";
import baby from "./baby.svg";

export default function ItemResult(props) {
  const toilet = props.data;

  // Get the opening hours in numbers and actual hour
  const [openingHours, setOpeningHours] = useState({
    opening: Number(toilet.fields.horaire.split(" ")[0]),
    closing: Number(toilet.fields.horaire.split(" ")[3]),
    userHour: new Date().getHours(),
  });

  
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

    return interval.includes(openingHours.userHour) ? true : false;
  };

  // Variable to check if the toilets are opened or not
  let isOpen = createInterval();
  console.log(isOpen);



  return (
    <div className={isOpen ? 'item-result item-open' : 'item-result'}>
      <h4 className="title">{toilet.fields.adresse}</h4>
      <div className="item-result-infos">
        {toilet.fields.horaire === "Voir fiche équipement" ? (
          <div className="item-result-infos--item">
            <img src={clock} alt="Icone des horaires" />
            <a
              href={toilet.fields.url_fiche_equipement}
              className="body-min"
              target="_blank"
            >
              Consulter
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

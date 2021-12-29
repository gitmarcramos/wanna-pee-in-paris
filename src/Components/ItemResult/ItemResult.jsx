import React from "react";
import "./ItemResult.css";

//images
import clock from "./clock.svg";
import wheels from "./wheel.svg";
import baby from "./baby.svg";

export default function ItemResult(props) {
  const toilet = props.data;
  return (
    <div className="item-result">
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

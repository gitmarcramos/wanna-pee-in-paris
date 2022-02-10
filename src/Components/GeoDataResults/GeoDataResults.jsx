import React, { useState, useEffect, useRef } from "react";
import "./GeoDataResults.css";
//components
import Loader from "../Loader/Loader";
import ItemResult from "../ItemResult/ItemResult";

// React Map GL
import Map, { GeolocateControl, Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function GeoDataResults(props) {
  //Get the user geolocation
  const [userGeoLocation, setUserGeoLocation] = useState({
    longitude: props.coordinates.longitude,
    latitude: props.coordinates.latitude,
  });

  //Sets the map
  const [viewState, setViewState] = useState({
    longitude: userGeoLocation.longitude,
    latitude: userGeoLocation.latitude,
    zoom: 13.5,
  });

  //REF for user icon
  const geolocateControlRef = useRef(null);

  //Choose the range for showing toilets
  const [range, setRange] = useState("500");

  const handleRange = (e) => {
    setRange(e.target.value);
  };

  //Get all toilets from Toilets API
  const [toilets, setToilets] = useState([]);

  //Filter for ACCES PMR
  const [pmr, setPMR] = useState("");
  const prmFunc = (e) => {
    e.currentTarget.checked ? setPMR("&refine.acces_pmr=Oui") : setPMR("");
  };

  //Filter for RELAIS BEBE
  const [baby, setBaby] = useState("");
  const toggleAccesBaby = (e) => {
    e.currentTarget.checked ? setBaby("&refine.relais_bebe=Oui") : setBaby("");
  };

  useEffect(async () => {
    try {
      const APItoilets = await (
        await fetch(
          "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=1000&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe" +
            pmr +
            baby +
            "&geofilter.distance=" +
            userGeoLocation.latitude +
            "%2C" +
            userGeoLocation.longitude +
            "%2C" +
            range
        )
      ).json();
      setToilets(APItoilets.records);
      //here set the user icon of current position
      setTimeout(() => {
        geolocateControlRef.current.trigger();
      }, 100);
      // await geolocateControlRef.current.trigger();
    } catch (e) {
      console.error(e);
    }
  }, [range, baby, pmr]);

  //Fall back if the first TRIGGER method for showing user icon doesn't works
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [userGeoLocation.longitude, userGeoLocation.latitude],
        },
      },
    ],
  };

  // Styles the data
  const layerStyle = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 5,
      "circle-color": "#007cbf",
    },
  };

  // Set the toilet selected by user, clicked on the map
  const [selectedToilet, setSelectedToilet] = useState(null);

  return (
    <>
      <Loader />
      <div className="geoDataResults">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={
            "pk.eyJ1IjoibWFyYy1yYW1vcyIsImEiOiJja3o5d29tOWEwMHNtMnJwZ2huaWl0aTU4In0.9dpBkYt3Vcl2ylw79DTGqw"
          }
          style={{ height: "100%" }}
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          <GeolocateControl
            ref={geolocateControlRef}
            showUserHeading={true}
            trackUserLocation={true}
          />

          {toilets.map((toilet) => {
            return (
              <Marker
                key={toilet.recordid}
                latitude={toilet.geometry.coordinates[1]}
                longitude={toilet.geometry.coordinates[0]}
              >
                <button
                  className={
                    toilet === selectedToilet
                      ? "marker marker-clicked"
                      : "marker"
                  }
                  onClick={(e) => {
                    setSelectedToilet(toilet);
                    e.currentTarget.classList.toggle("marker-clicked");
                  }}
                ></button>
              </Marker>
            );
          })}
        </Map>

        <div className="pill"></div>
        <div className="layer-card-infos" draggable="true">
          <label htmlFor="range-selector" className="body-min range-label">
            <span className="sub">{toilets.length}</span> Toilettes publiques{" "}
            <br /> dans un rayon de {range} mètres
          </label>
          <br />
          <input
            id="range-selector"
            type="range"
            min="100"
            max="5000"
            value={range}
            step="100"
            onChange={handleRange}
          />
          <div className="checkbox-container">
            <h3 className="sub">Filtrer</h3>
            <div className="checkbox-container-filter">
              <div className="checkbox-container-filter--item">
                <label htmlFor="acces-pmr" className="body-min">
                  Accès PMR
                </label>
                <input type="checkbox" id="acces-pmr" onClick={prmFunc} />
              </div>
              <div className="checkbox-container-filter--item">
                <label htmlFor="relais-bebe" className="body-min">
                  Relais bébé
                </label>
                <input
                  type="checkbox"
                  id="relais-bebe"
                  onClick={toggleAccesBaby}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={selectedToilet ? "selected-toilet-card" : null}>
          {selectedToilet && (
            <>
              <button
                className="close-selected-toilets"
                onClick={() => {
                  setSelectedToilet(null);
                }}
              >
                Close
              </button>
              <ItemResult data={selectedToilet} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

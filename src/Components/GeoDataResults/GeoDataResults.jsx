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
  useEffect(async () => {
    try {
      const APItoilets = await (
        await fetch(
          "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=1000&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=" +
            userGeoLocation.latitude +
            "%2C" +
            userGeoLocation.longitude +
            "%2C" +
            range
        )
      ).json();
      setToilets(APItoilets.records);
      //here set the user icon of current position
      geolocateControlRef.current.trigger();
    } catch (e) {
      console.error(e);
    }
  }, [range]);

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
    <div className="geoDataResults">
      <Loader />
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={"pk.eyJ1IjoibWFyYy1yYW1vcyIsImEiOiJja3o5d29tOWEwMHNtMnJwZ2huaWl0aTU4In0.9dpBkYt3Vcl2ylw79DTGqw"}
        style={{ height: "100%" }}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <GeolocateControl ref={geolocateControlRef} />

        {toilets.map((toilet) => {
          return (
            <Marker
              key={toilet.recordid}
              latitude={toilet.geometry.coordinates[1]}
              longitude={toilet.geometry.coordinates[0]}
            >
              <button
                className={toilet === selectedToilet ? "marker marker-clicked" : "marker"}
                onClick={(e) => {
                  setSelectedToilet(toilet);
                  e.currentTarget.classList.toggle("marker-clicked");
                }}
              ></button>
            </Marker>
          );
        })}
      </Map>

      <div className="layer-card-infos">
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
      </div>

      <div className={selectedToilet ? "selected-toilet-card" : null}>
        {selectedToilet && (
          <>
            <ItemResult data={selectedToilet} />
          </>
        )}
      </div>
    </div>
  );
}

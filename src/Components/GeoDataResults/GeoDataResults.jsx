import React, { useState, useEffect } from "react";
import "./GeoDataResults.css";
//components
import Loader from "../Loader/Loader";

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
    zoom: 14.5,
  });

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
          "https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=100&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&geofilter.distance=" +
            userGeoLocation.latitude +
            "%2C" +
            userGeoLocation.longitude +
            "%2C" +
            range
        )
      ).json();
      setToilets(APItoilets.records);
    } catch (e) {
      console.error(e);
    }
  }, [range]);

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
      "circle-radius": 10,
      "circle-color": "#007cbf",
    },
  };

  // Set the toilet selected by user, clicked on the map
  const [selectedToilet, setSelectedToilet] = useState(null);

  console.log(selectedToilet);

  return (
    <div className="geoDataResults">
      <Loader />
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN}
        style={{ height: "60%" }}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <GeolocateControl />

        {toilets.map((toilet) => {
          return (
            <Marker
              key={toilet.recordid}
              latitude={toilet.geometry.coordinates[1]}
              longitude={toilet.geometry.coordinates[0]}
            >
              <button
                className="marker"
                onClick={(e) => {
                  setSelectedToilet(toilet);
                }}
              ></button>
            </Marker>
          );
        })}
      </Map>

      <label htmlFor="range-selector">
        Toilettes dans un rayon de {range} mètres
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
      {selectedToilet && (
        <>
          <h1>{selectedToilet.fields.adresse}</h1>
        </>
      )}
    </div>
  );
}

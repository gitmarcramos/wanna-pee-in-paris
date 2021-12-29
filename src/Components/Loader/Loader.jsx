import { useState, useEffect } from "react";
import "./Loader.css";

export default function Loader() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loader ? (
        <div className="loader">
          <h1 className="body white">Recherche en cours</h1>
          <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              id="loader-out"
              cx="29"
              cy="29"
              r="28"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="170"
            />
            <circle
              id="loader-middle"
              cx="29"
              cy="29"
              r="21"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="150"
            />
            <circle
              id="loader-in"
              cx="29"
              cy="29"
              r="13"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="50"
            />
          </svg>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

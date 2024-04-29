"use client";
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMapComponent = ({ apiKey, location, zoom }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.onload = () => {
      // Initialize map after script is loaded
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: location,
          zoom: zoom,
        }
      );
      setMap(newMap);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return (
    <div id="map" style={{ width: "100%", height: "400px" }}>
      {map && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{ lat: 19.817743, lng: 85.828629 }}
          defaultZoom={15}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            setMap(map);
          }}
        >
          {location && (
            <div
              lat={location.lat}
              lng={location.lng}
              style={{
                color: "red",
                fontSize: "24px",
                position: "absolute",
                transform: "translate(-50%, -100%)",
              }}
            ></div>
          )}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default GoogleMapComponent;

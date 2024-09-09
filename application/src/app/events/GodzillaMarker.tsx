import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

const PEARL_DISTRICT: Coordinate = { lat: 45.5276, lng: -122.683 };
const RADIUS_MILES = 5;
const SPEED_MPS = 500;
const UPDATE_INTERVAL_SEC = 1;
const EARTH_RADIUS_KM = 6371;

export function GodzillaMarker() {
const [marker, setMarker] = useState<Coordinate>(godzillaPath[0]);
  useEffect(() => {
    // Update Godzilla's position every 5 seconds
    const intervalId = setInterval(() => {
      const newPosition = getNextGodzillaPosition();
      // Update your map pin here with newPosition
      console.log(`Godzilla's new position: ${JSON.stringify(newPosition)}`);
      setMarker(newPosition);
    }, UPDATE_INTERVAL_SEC * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Marker
      position={{
        lat: marker.lat,
        lng: marker.lng,
      }}
      icon={
        new Icon({
          iconUrl: "https://cdn-icons-png.freepik.com/512/774/774952.png",
          iconSize: [28, 35], // size of the icon which the popup should open relative to the iconAnchor
        })
      }
    >
      <Popup>Godzilla!!!!</Popup>
    </Marker>
  );
}

interface Coordinate {
  lat: number;
  lng: number;
}



function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function generateCircularPath(
  center: Coordinate,
  radiusMiles: number,
  numPoints: number
): Coordinate[] {
  const path: Coordinate[] = [];
  const radiusKm = radiusMiles * 1.60934; // Convert miles to km

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const lat =
      center.lat +
      (radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI) * Math.cos(angle);
    const lng =
      center.lng +
      ((radiusKm / EARTH_RADIUS_KM) * (180 / Math.PI) * Math.sin(angle)) /
        Math.cos(degreesToRadians(center.lat));
    path.push({ lat, lng });
  }

  return path;
}

// Calculate the number of points based on the circumference and speed
const circumference = 2 * Math.PI * RADIUS_MILES * 1609.34; // in meters
const totalSeconds = circumference / SPEED_MPS;
const numPoints = Math.ceil(totalSeconds / UPDATE_INTERVAL_SEC);

const godzillaPath = generateCircularPath(
  PEARL_DISTRICT,
  RADIUS_MILES,
  numPoints
);

// Usage
let currentIndex = 0;

function getNextGodzillaPosition(): Coordinate {
  const position = godzillaPath[currentIndex];
  currentIndex = (currentIndex + 1) % godzillaPath.length;
  return position;
}

"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React from "react";
import { GodzillaMarker } from "./GodzillaMarker";

export function Map({
    center,
    markers,
}: {
    center: { lat: number; lng: number };
    markers: { id: string; lat: number; lng: number; renderPopupContent: () => JSX.Element }[];
}) {

  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom
      className="h-[60vh] w-[60vw]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GodzillaMarker />
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <Popup>
              {marker.renderPopupContent()}
            </Popup>
          </Marker>
        );
      })}
      
    </MapContainer>
  );
}

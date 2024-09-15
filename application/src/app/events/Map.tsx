"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React, { useState } from "react";
import { GodzillaMarker } from "./GodzillaMarker";
import { LatLng } from "leaflet";
import { EventForm } from "./EventForm";
import { LocationContext } from "./Events";

export function Map({
  center,
  markers,
}: {
  center: { lat: number; lng: number };
  markers: {
    id: string;
    lat: number;
    lng: number;
    renderPopupContent: () => JSX.Element;
  }[];
}) {
  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GodzillaMarker />
      <LocationMarker />
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          >
            <Popup>{marker.renderPopupContent()}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

function LocationMarker() {
  const {location, setLocation} = React.useContext(LocationContext);
  useMapEvents({
    click(e) {
      e.latlng && setLocation(e.latlng);
    },
  });

  return location === null ? null : (
    <Marker position={location}>
      <Popup keepInView>
        <div className="max-h-[50vh] overflow-auto p-2">
          <EventForm />
        </div>
      </Popup>
    </Marker>
  );
}

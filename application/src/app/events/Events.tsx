"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { EventForm } from "./EventForm";
import { Map } from "./Map";
import Image from "next/image";
import { DateTime } from "luxon";
import React from "react";
import { LatLng } from "leaflet";


export const LocationContext = React.createContext<{
  location: LatLng | null;
  setLocation: (location: LatLng | null) => void;
}>({
  location: null,
  setLocation: () => {},
});

export default function Events() {
  const [location, setLocation] = React.useState<LatLng | null>(null);
  const events = useQuery(api.events.get);
  if (!events?.length)
    return (
      <Skeleton className="animate-pulse rounded-md bg-muted h-4 w-[250px]" />
    );
  return (
    <LocationContext.Provider value={{ location, setLocation}}>
    <div className="flex">
      <aside className="max-h-[90vh] sticky top-0 bg-gray-800 p-4 overflow-auto flex flex-col gap-2">
        <h1 className="text-xl">Events List</h1>
        <p>Add a new event by clicking the map and then clicking the popover (Will improve this ux in the future)</p>
        <ul role="list" className="space-y-3">
          {events.map(
            ({
              _id,
              title,
              description,
              startDateTime,
              endDateTime,
              timezone,
            }) => (
              <li
                key={_id}
                className="overflow-hidden rounded-md bg-gray-700 px-6 py-4 shadow"
              >
                <div className="flex">
                  <div className="mr-4 flex-shrink-0 self-center">
                    <Image
                      src="https://unsplash.it/100/100"
                      width={100}
                      height={100}
                      alt=""
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{title}</h4>
                    <p className="text-sm text-gray-400">
                      {DateTime.fromISO(startDateTime)
                        .setZone(timezone)
                        .toFormat("yyyy LLL dd, hh:mm a")}{" "}
                      -{" "}
                      {DateTime.fromISO(endDateTime)
                        .setZone(timezone)
                        .toFormat("yyyy LLL dd, hh:mm a")}
                    </p>
                    <p className="mt-1">{description}</p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </aside>

      <div className="w-full h-[90vh]">
        <Map
          center={{ lat: events[0].latitude, lng: events[0].longitude }}
          markers={events.map(({ _id, latitude, longitude, title }) => ({
            id: _id,
            lat: latitude,
            lng: longitude,
            renderPopupContent: () => <h1>{title}</h1>,
          }))}
        />
      </div>
    </div>
    </LocationContext.Provider>
  );
}

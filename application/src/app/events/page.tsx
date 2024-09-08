"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { EventForm } from "./EventForm";
import { Map } from "./Map";

export default function Events() {
  const events = useQuery(api.events.get);
  if (!events)
    return (
      <Skeleton className="animate-pulse rounded-md bg-muted h-4 w-[250px]" />
    );
  return (
    <main>
      <Map
        center={{ lat: events[0].latitude, lng: events[0].longitude }}
        markers={events.map(({ _id, latitude, longitude, title }) => ({
          id: _id,
          lat: latitude,
          lng: longitude,
          renderPopupContent: () => <h1>{title}</h1>,
        }))}
      />
      <h1 className="text-xl">Events List</h1>
      {events.map(({ _id, title, description }) => (
        <div key={_id}>
          <h2>{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      ))}
      <EventForm />
    </main>
  );
}

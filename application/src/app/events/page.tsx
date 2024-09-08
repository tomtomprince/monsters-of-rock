"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { EventForm } from "./EventForm";

export default function Events() {
    const events = useQuery(api.events.get);
    return (
      <main>
        <h1 className="text-xl">Events List</h1>
        {!events && (
          <Skeleton className="animate-pulse rounded-md bg-muted h-4 w-[250px]" />
        )}
        {events &&
          events?.map(({ _id, title, description }) => (
            <div key={_id}>
              <h2>{title}</h2>
              <p className="text-sm">{description}</p>
            </div>
          ))}
        <EventForm />
      </main>
    );
}


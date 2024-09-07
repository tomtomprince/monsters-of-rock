"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Events() {
    const events = useQuery(api.events.get);
    return (
      <main>
        <h1 className="text-xl">Events List</h1>
        {!events && <div>Loading...</div>}
        {events &&
          events?.map(({ _id, title, description }) => (
            <div key={_id}>
              <h2>{title}</h2>
              <p className="text-sm">{description}</p>
            </div>
          ))}
      </main>
    );
}

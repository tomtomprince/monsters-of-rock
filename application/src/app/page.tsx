"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import Events from "./events/Events";

export default function Home() {
  return (
    <main>
      <Unauthenticated>
        Ya gotta sign in...
      </Unauthenticated>
      <Authenticated>
        <Events />
      </Authenticated>
    </main>
  );
}
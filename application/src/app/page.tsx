"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
    </main>
  );
}

function Content() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</div>
  );
}
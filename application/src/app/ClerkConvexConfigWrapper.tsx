"use client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ClerkConvexConfigWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "string") {
    throw new Error("You need to set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {/* TODO: Move this publishableKey to a env var */}
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

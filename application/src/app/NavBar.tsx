"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Unauthenticated, Authenticated } from "convex/react";

export function NavBar() {
  return (
    <nav className="bg-gray-800" aria-label="Global">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            Monsters of Rock
          </div>
          {/* <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
              >
                {item.name}
              </a>
            ))}
          </div> */}
        </div>
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <div>
              <Unauthenticated>
                <SignInButton mode="modal" />
              </Unauthenticated>
              <Authenticated>
                <UserButton />
              </Authenticated>
            </div>
          </div>
        </div>
      </div>
    </div>
    </nav>
  );
}

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This is a hackathon project for https://www.learnwithjason.dev/blog/web-dev-challenge-hackathon-monsters/

## How far I got
Clerk and Convex set up were pretty easy. I added a rough form to create events and decided that creating was enough. Then I added 1 monster (Godzilla, obviously) and added a cron func to move him towards the last event created since Godzilla obviously has serious FOMO.

This at least shows some cool Convex functionality along with the most basic of Clerk functionality.

## Initial MVP Spec
Monsters are real and they've come to rock with us from the depths of Earth bringing heavy metal and good vibes.

This exists in the Toho Godzilla universe loosely, but you'll probably see a lot of various monsters.

This is an event marketplace for managing events, ticket sales, band match making, gear sales, etc.

#### The MVP will allow:

1. Basic auth via Clerk
2. Users can CRUD of events (via Convex)
    a. Events should maintain time in UTC along with a timezone component. They should be displayed in the timezone they are created in.
    b. Online ticket sale deadlines are not mvp, but will display in both event tz and user tz.
3. Users can view available events on a calendar
4. Users can see where events are on a map
5. Users can see where Godzilla and other monsters are on a map
6. Users can view events filtered by probability of monster battle
    a. Or maybe they want to see Godzilla and Godzilla likes certain shows more than others
    b. Keep it simple -- we'll assume that Godzilla is super helpful and travels known patrols to his known favorite shows. We'll assume that he's cat-like and sleeps in the Colosseum during the day from 9am to 6pm and always moves at a certain rate.
    c. Server tick is 5 minutes?

#### Capture for stretch goals
- [ ] Vendor/Performer Management
- [ ] Users can "purchase" tickets
- [ ] Users can filter calendar/lists for events they've purchased tickets for
- [ ] Event Discovery and Recommendation
- [ ] Notification/Alert System
- [ ] User Profiles and Social Features

#### Some Ideas from Claude based on above
- [ ] Kaiju Spotter's Guide: An app that allows users to identify different types of kaiju, learn about their strengths, weaknesses, and behaviors. It could include a bestiary with in-depth profiles, user-submitted sightings, and mini-games to test your kaiju knowledge.

- [ ] Kaiju Battle Simulator: This could be a playful interactive app where users can pit different kaiju against each other, adjust variables like size, strength, and special abilities, and simulate epic battles. Successful battles could unlock new kaiju to add to the roster.

- [ ] Kaiju Tourism: Embrace the campy side of the kaiju world and create an app that helps humans plan "monster-watching" vacations. It could provide guides to the best kaiju-spotting locations, hotels/restaurants that cater to kaiju enthusiasts, and even package deals for monster-themed activities.

- [ ] Kaiju Alert Network: A real-time monitoring and warning system that notifies users of incoming kaiju threats, provides evacuation guidance, and even allows citizens to report monster sightings to help authorities respond.

- [ ] Kaiju Pet Adoption: Lean into the more adorable side of the kaiju world by creating an app that connects people with "pocket-sized" kaiju pets they can adopt and care for. Users could customize their kaiju's appearance, skills, and personality.

## Tech Used
- https://dashboard.convex.dev/ - Database, cron, etc
- https://dashboard.clerk.com/ - Clerk - Auth
- https://ui.shadcn.com/ - UI Components
- https://react-leaflet.js.org/ - Maps
    - https://ujjwaltiwari2.medium.com/a-guide-to-using-openstreetmap-with-react-70932389b8b1 - Possible extensions

## Initial Demo Video
https://github.com/user-attachments/assets/2164b8b9-b33c-4643-a484-c1d094ef73af

## Getting Started
You'll need to setup Convex and Clerk and add the necessary environment variables to `.env.local` to get started.
```
CONVEX_DEPLOYMENT=<create a project and add>

NEXT_PUBLIC_CONVEX_URL=<convex dashboard - see next js quickstart>

# Clerk
# This url is also set in the Convex UI
NEXT_PUBLIC_CLERK_URL=<from clerk dashboard>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from clerk dashboard - see next js quickstart>
```

Run the development server:

```bash
# First
npx convex dev

# Then in a separate terminal
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "moveGodzilla",
  { minutes: 15 },
  internal.godzilla.godzillaCron
);

export default crons;
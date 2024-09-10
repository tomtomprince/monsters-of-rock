import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "moveGodzilla",
  { seconds: 5 },
  internal.godzilla.godzillaCron
);

export default crons;
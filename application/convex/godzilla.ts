import { internalMutation, query } from "./_generated/server";

interface Coordinate {
  lat: number;
  lng: number;
}

const SPEED_MPS = 500;
const UPDATE_INTERVAL_SEC = 5;
const EARTH_RADIUS_KM = 6371;

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function getDistanceKm(coord1: Coordinate, coord2: Coordinate): number {
  const dLat = degreesToRadians(coord2.lat - coord1.lat);
  const dLon = degreesToRadians(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(coord1.lat)) *
      Math.cos(degreesToRadians(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}


function moveTowardsEvent(
  currentPos: Coordinate,
  eventPos: Coordinate,
  distanceM: number
): Coordinate {
  const totalDistanceKm = getDistanceKm(currentPos, eventPos);
  const ratio = Math.min(distanceM / 1000 / totalDistanceKm, 1); // Ensure we don't overshoot

  const newLat = currentPos.lat + (eventPos.lat - currentPos.lat) * ratio;
  const newLng = currentPos.lng + (eventPos.lng - currentPos.lng) * ratio;

  return { lat: newLat, lng: newLng };
}

function updateGodzillaPosition(nextEventCoordinate: Coordinate, godzillaPosition: Coordinate): Coordinate {
  
  if (!nextEventCoordinate) {
    return godzillaPosition;
  }

  const distanceToMoveM = SPEED_MPS * UPDATE_INTERVAL_SEC;
  return moveTowardsEvent(
    godzillaPosition,
    nextEventCoordinate,
    distanceToMoveM
  );
}

export const godzillaCron = internalMutation({
  handler: async (ctx) => {
    const nextEvent = await ctx.db
      .query("events").order('desc')
      .first();

    const godzillaRecord = await ctx.db
      .query("monsters")
      .filter((q) => q.eq(q.field("name"), "Godzilla"))
      .first();

    if (nextEvent && godzillaRecord) {
      const newGodzillaPosition = updateGodzillaPosition(
        {
          lat: nextEvent.latitude,
          lng: nextEvent.longitude,
        },
        {
          lat: godzillaRecord.latitude,
          lng: godzillaRecord.longitude,
        }
      );
      ctx.db.patch(godzillaRecord._id, {
        latitude: newGodzillaPosition.lat,
        longitude: newGodzillaPosition.lng,
        currentEventTitle: nextEvent.title,
        currentEventId: nextEvent._id,
      });
    }
  },
});

export const getGodzilla = query({
    args: {},
    handler: async (ctx) => {
        const godzillaRecord = await ctx.db
        .query("monsters")
        .filter((q) => q.eq(q.field("name"), "Godzilla"))
        .first();
        return godzillaRecord;
    },
});
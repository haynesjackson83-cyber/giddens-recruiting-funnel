import { overviewSchedule, overviewTimeZone } from "@/config/overviewSchedule";

type ZonedParts = { year: number; month: number; day: number; hour: number; minute: number; second: number };

const zonedDateTimeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: overviewTimeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function getZonedParts(date: Date): ZonedParts {
  const parts = zonedDateTimeFormat.formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const hour = value("hour");
  return { year: value("year"), month: value("month"), day: value("day"), hour: hour === 24 ? 0 : hour, minute: value("minute"), second: value("second") };
}

function getTimeZoneOffsetMs(date: Date): number {
  const parts = getZonedParts(date);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return asUtc - date.getTime();
}

function zonedWallTimeToDate(year: number, month: number, day: number, hour: number, minute: number) {
  const wallTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let candidate = new Date(wallTimeAsUtc - getTimeZoneOffsetMs(new Date(wallTimeAsUtc)));
  candidate = new Date(wallTimeAsUtc - getTimeZoneOffsetMs(candidate));
  return candidate;
}

export type NextOverview = { startsAt: Date; label: string };

export function getNextOverview(now = new Date()): NextOverview | null {
  const nowInCentral = getZonedParts(now);
  const centralMidday = Date.UTC(nowInCentral.year, nowInCentral.month - 1, nowInCentral.day, 12);

  for (let dayOffset = 0; dayOffset <= 7; dayOffset += 1) {
    const dateCursor = new Date(centralMidday + dayOffset * 24 * 60 * 60 * 1000);
    const scheduleForDay = overviewSchedule
      .filter((entry) => entry.day === dateCursor.getUTCDay())
      .sort((a, b) => a.hour - b.hour || a.minute - b.minute);

    for (const entry of scheduleForDay) {
      const startsAt = zonedWallTimeToDate(dateCursor.getUTCFullYear(), dateCursor.getUTCMonth() + 1, dateCursor.getUTCDate(), entry.hour, entry.minute);
      if (startsAt.getTime() > now.getTime()) {
        return {
          startsAt,
          label: startsAt.toLocaleString("en-US", { timeZone: overviewTimeZone, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true }),
        };
      }
    }
  }

  return null;
}

export function getTimeRemaining(target: Date, now = new Date()) {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  return { days: Math.floor(totalSeconds / 86400), hours: Math.floor((totalSeconds % 86400) / 3600), minutes: Math.floor((totalSeconds % 3600) / 60), seconds: totalSeconds % 60, totalSeconds };
}

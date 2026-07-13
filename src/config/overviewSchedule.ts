export const overviewTimeZone = "America/Chicago";

export type OverviewScheduleEntry = {
  /**
   * JavaScript weekday numbering:
   * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
   * 4 = Thursday, 5 = Friday, 6 = Saturday.
   */
  day: number;
  hour: number;
  minute: number;
};

export const overviewSchedule: OverviewScheduleEntry[] = [
  { day: 1, hour: 9, minute: 0 }, { day: 1, hour: 12, minute: 0 }, { day: 1, hour: 18, minute: 0 },
  { day: 2, hour: 9, minute: 0 }, { day: 2, hour: 12, minute: 0 }, { day: 2, hour: 18, minute: 0 },
  { day: 3, hour: 9, minute: 0 }, { day: 3, hour: 12, minute: 0 }, { day: 3, hour: 18, minute: 0 },
  { day: 4, hour: 9, minute: 0 }, { day: 4, hour: 12, minute: 0 }, { day: 4, hour: 18, minute: 0 },
  { day: 5, hour: 9, minute: 0 }, { day: 5, hour: 12, minute: 0 }, { day: 5, hour: 18, minute: 0 },
];

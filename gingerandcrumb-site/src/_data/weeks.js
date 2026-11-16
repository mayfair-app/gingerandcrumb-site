// Builds the availability weeks automatically from today's date (Toronto time).
// Week 1 is the current Monday–Sunday week. Spots left for each week come from
// "week_spots" in availability.json, which Julianna can change in the editing page.
import fs from "node:fs";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function () {
  const settings = JSON.parse(fs.readFileSync(new URL("./availability.json", import.meta.url), "utf8"));
  const total = Number(settings.orders_per_week) || 10;
  const pattern = Array.isArray(settings.week_spots) && settings.week_spots.length ? settings.week_spots : [0, 0, 4, 8];

  // Today's date in Toronto, as a UTC-midnight date so day math is exact.
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const [y, m, d] = ymd.split("-").map(Number);
  const today = new Date(Date.UTC(y, m - 1, d));
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - ((today.getUTCDay() + 6) % 7));

  return pattern.map((left, i) => {
    const start = new Date(monday);
    start.setUTCDate(monday.getUTCDate() + i * 7);
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 6);
    const sm = MONTHS[start.getUTCMonth()], em = MONTHS[end.getUTCMonth()];
    const label = sm === em
      ? `${sm} ${start.getUTCDate()} – ${end.getUTCDate()}`
      : `${sm} ${start.getUTCDate()} – ${em} ${end.getUTCDate()}`;
    const spots = Math.max(0, Math.min(Number(left) || 0, total));
    return { label, spots_total: total, spots_left: spots };
  });
}

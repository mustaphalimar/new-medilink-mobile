import { parseISO, format } from "date-fns";

export function createMarkup(dirty: string) {
  return { html: dirty };
}

export function extractDate(date: string) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "yyyy-MM-dd");

  return formattedDate;
}

export function extractTime(date: string) {
  const parsedDate = parseISO(date);
  const formattedTime = format(parsedDate, "HH:mm:ss");

  return formattedTime;
}

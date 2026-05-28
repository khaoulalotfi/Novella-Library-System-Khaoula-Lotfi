const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/**
 * Converts an ISO date string (YYYY-MM-DD) into a human-readable form.
 * Used for displaying loan borrow / return dates.
 *
 * @example formatDate("2024-03-15") → "15 Mar 2024"
 * @returns The original string unchanged if it is not a valid ISO date.
 */
export function formatDate(isoString: string): string {
  if (!isoString) return ""
  const parts = isoString.split("-")
  if (parts.length !== 3) return isoString

  const [yearStr, monthStr, dayStr] = parts
  const year = parseInt(yearStr ?? "", 10)
  const month = parseInt(monthStr ?? "", 10)
  const day = parseInt(dayStr ?? "", 10)

  if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12) {
    return isoString
  }

  const monthName = MONTHS[month - 1]
  return `${String(day).padStart(2, "0")} ${monthName} ${year}`
}

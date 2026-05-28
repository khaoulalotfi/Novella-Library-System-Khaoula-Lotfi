/**
 * Jest — Unit test 4
 * Verifies that formatDate converts ISO date strings to a
 * human-readable "DD Mon YYYY" format used for loan dates.
 */

import { formatDate } from "@/utils/format-date"

describe("formatDate", () => {
  it("converts an ISO date string into a readable day-month-year format", () => {
    expect(formatDate("2024-03-15")).toBe("15 Mar 2024")
    expect(formatDate("2020-01-01")).toBe("01 Jan 2020")
    expect(formatDate("1999-12-31")).toBe("31 Dec 1999")
  })
})

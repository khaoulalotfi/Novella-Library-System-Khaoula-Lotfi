/**
 * Playwright — E2E tests for the books section (tests 1-3)
 *
 * Authentication is handled globally: global-setup.ts logs in once and saves
 * the session to e2e/.auth.json.  playwright.config.ts loads that file via
 * storageState so every test here starts already authenticated.
 *
 * Test 1: Book list page loads with heading and table
 * Test 2: Clicking "View" on a book opens the details dialog
 * Test 3: Book search form returns a result count
 */

import { test, expect } from "@playwright/test"

// ── Test 1 ──────────────────────────────────────────────────────────────────
test("book list page loads with heading and table headers", async ({ page }) => {
  await page.goto("/en/books/list")

  await expect(page.getByRole("heading", { name: "Book List" })).toBeVisible()
  await expect(page.getByRole("columnheader", { name: "Title" })).toBeVisible()
  await expect(page.getByRole("columnheader", { name: "Author(s)" })).toBeVisible()
})

// ── Test 2 ──────────────────────────────────────────────────────────────────
test("clicking View on a book opens the details dialog", async ({ page }) => {
  await page.goto("/en/books/details")

  await expect(page.getByRole("heading", { name: "Book Details" })).toBeVisible()

  // Only interact if books are present in the database
  const viewBtn = page.getByRole("button", { name: "View" }).first()
  if (await viewBtn.isVisible()) {
    await viewBtn.click()
    await expect(page.getByText("Book Information")).toBeVisible()
  }
})

// ── Test 3 ──────────────────────────────────────────────────────────────────
test("book search form shows result count after submitting", async ({ page }) => {
  await page.goto("/en/books/search")

  await page.locator('input[name="title"]').fill("a")
  await page.getByRole("button", { name: "Search" }).click()

  await expect(page.getByText(/result\(s\) found/)).toBeVisible()
})

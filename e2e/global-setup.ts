/**
 * Playwright global setup — runs once before any test file.
 *
 * Logs in via the UI and saves the session (cookies + localStorage) to
 * e2e/.auth.json.  Every test project that sets
 *   storageState: "e2e/.auth.json"
 * in playwright.config.ts will reuse this session automatically.
 *
 * ⚠️  Replace the two placeholder values below with your real credentials.
 */

import { chromium, type FullConfig } from "@playwright/test"
import path from "path"

// ── Credentials — fill these in ─────────────────────────────────────────────
const TEST_EMAIL = "khaoula.lotfi@panko.lt"
const TEST_PASSWORD = "12345678"
// ────────────────────────────────────────────────────────────────────────────

export const AUTH_FILE = path.join(__dirname, ".auth.json")

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL ?? "http://localhost:3000"

  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  // Navigate to the sign-in page
  await page.goto(`${baseURL}/en/signin`)

  // Fill the credentials using the placeholders the app renders
  await page.locator('input[placeholder="you@example.com"]').fill(TEST_EMAIL)
  await page.locator('input[placeholder="Enter password"]').fill(TEST_PASSWORD)

  // Submit
  await page.getByRole("button", { name: "Sign In" }).click()

  // Wait until the app redirects away from /signin (successful login)
  await page.waitForURL((url) => !url.pathname.endsWith("/signin"), {
    timeout: 15_000,
  })

  // Persist the session so test projects can reuse it
  await context.storageState({ path: AUTH_FILE })

  await browser.close()
}

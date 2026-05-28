/**
 * Playwright — E2E test 4
 * Verifies that clicking nav links lands on the correct page.
 *
 * This test must run WITHOUT a session so the "Sign In" link is visible in
 * the auth-nav.  We override storageState to an empty object here so the
 * global authenticated session from e2e/.auth.json is NOT used.
 */

import { test, expect } from "@playwright/test"

// Run this test with no saved session (unauthenticated)
test.use({ storageState: { cookies: [], origins: [] } })

test("clicking Sign In navigates to the sign-in page", async ({ page }) => {
  await page.goto("/en")

  // The "Sign In" link sits in the header auth-nav and is always visible
  // for unauthenticated users
  await page.getByRole("link", { name: "Sign In" }).click()

  // URL must change to the sign-in route
  await expect(page).toHaveURL(/\/en\/signin$/)

  // The sign-in card subtitle confirms the correct page loaded
  // (CardTitle renders as <div>, not a semantic heading, so we check
  //  the unique description paragraph instead)
  await expect(
    page.getByText("Enter your credentials to access your account"),
  ).toBeVisible()
})

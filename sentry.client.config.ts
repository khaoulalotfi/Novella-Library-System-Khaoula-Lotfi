import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Replay captures user sessions on errors for easier debugging
  integrations: [
    Sentry.replayIntegration(),
  ],

  // Percentage of transactions sent to Sentry for performance monitoring
  tracesSampleRate: 1.0,

  // Capture 10 % of sessions normally, 100 % when an error occurs
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Disable Sentry in development so the console stays clean
  enabled: process.env.NODE_ENV === "production",
})

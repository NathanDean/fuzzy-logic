# Deployment checklist

## Run tests

1. Jest tests
2. Manual tests

## Check environment varables

1. On Supabase (Dashboard/Authentication/Attack Protection)
   1. Turnstile
      1. Secret key - "Captcha Secret"
2. On Vercel (Settings/Environment Variables)
   1. App
      1. Site URL - NEXT_PUBLIC_SITE_URL
   2. Stripe
      1. Webhook secret - STRIPE_WEBHOOK_SECRET
      2. Secret key - STRIPE_SECRET_KEY
      3. Publishable key - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   3. Supabase
      1. URL - NEXT_PUBLIC_SUPABASE_URL
      2. Anon key - NEXT_PUBLIC_SUPABASE_ANON_KEY
      3. Service role key - SUPABASE_SERVICE_ROLE_KEY
   4. Turnstile
      1. Site key - NEXT_PUBLIC_TURNSTILE_SITE_KEY
      2. Secret key - TURNSTILE_SECRET_KEY

## Rerun manual tests

## Switch Stripe to live mode

1. Update
   1. On Vercel
      1. Stripe
         1. Webhook secret - STRIPE_WEBHOOK_SECRET
         2. Secret key - STRIPE_SECRET_KEY
         3. Publishable key - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Deployment checklist

## Run tests
1. Jest tests
2. Manual tests

## Check environment varables
1. On Supabase
    1. Turnstile
        1. Secret key
2. On Vercel
    1. App
        1. Site URL
    2. Stripe
        1. Webhook secret
        2. Secret key
        3. Publishable key
    3. Supabase
        1. URL
        2. Anon key
        3. Service role key
    4. Turnstile
        1. Site key
        2. Secret key

## Switch Stripe to live mode
# Fuzzy Logic

## Overview

This is the booking platform for [Fuzzy Logic](https://www.fzzy.co.uk), an improv company I founded. I built it when I wanted to run a workshop, and took the opportunity to stretch my full stack development skills instead of using a third-party ticketing service.

### What it does

- Displays upcoming workshops
- Handles user account registration and authentication
- Processes payments through Stripe
- Shows upcoming bookings in user accounts

### Tech stack

- Next.js + TypeScript (front-end + back-end)
- Tailwind (styling)
- Supabase (database and auth)
- Cloudflare Turnstile (CAPTCHA)
- Stripe (payments)
- Jest (unit testing)
- Manual testing checklist for critical flows
- Vercel (deployment)

After initial development the site was fully functional, but the codebase was less coherent than I wanted, and I found it difficult to navigate and maintain. I therefore revisited the project a few months later and refactored parts of the site, including organising `/app` using route groups, dividing `/components` into subdirectories, and separating all actions and hooks into dedicated folders. I also split several pages into server components for data fetching, and client wrappers for rendering, to make them easier to maintain and test. At the same time, I added Husky to ensure code quality with automated pre-commit linting and testing.

I plan to continue refactoring the site, including standardising my approach to mocking across test suites, and applying design patterns where relevant.

## Data

Some documentation on how data flows in the app, for my benefit in maintaining the project as much as yours in reading about it 🙃.

### Supabase data fetching

The site fetches data from Supabase using the three clients in /utils/supabase:

- **admin.ts:** Uses createClient function with secret key, for backend admin
  - Used by Stripe webhook
- **browserClient.ts:** Uses createBrowserClient function with publishable key, for data fetching in client components
  - Used by auth context
- **serverClient.ts:** Uses createServerClient function with publishable key, for data fetching in server components
  - Used by:
    - About, Account, Workshops, and WorkshopDetails pages
    - `/auth/confirm` and `/auth/callback` routes
    - Mailing list, Stripe, and auth actions
    - Supabase updateSession middleware function

### Auth data flows

Authentication forms call actions from `/actions/auth`, which in turn call the relevant Supabase auth function:

#### Signup

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Signup page**<br>User submits form...<br>Calls signup action from...] --> B[**Auth actions**<br>Signup action validates form data...<br>Calls Supabase signUp function...]
    B --> |Success, redirect to...| C[**Auth success page**<br>User prompted to check inbox for confirmation email...]
    B --> |Error, remain on...| D[**Signup page**<br>User shown relevant error message]

```

#### Signup email confirmation

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Confirmation email**<br>User clicks confirmation link...] --> B[**Auth confirmation route**<br>Verifies one-time password...]
    B --> |Success, redirect to...| C[**Home page**]
    B --> |Error, redirect to...| D[**Error page**<br>User shown relevant error message]

```

#### Login

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Login page**<br>User submits form...<br>Calls login action from...] --> B[**Auth actions**<br>Login action validates form data...<br>Calls Supabase signInWithPassword function...]
    B --> |Success, action returns success indicator to...| C[**Login page**<br>Checks whether login is part of workshop booking attempt...]
    C --> | If so redirect user to... | D[**Stripe checkout session**]
    C --> | Else redirect user to... | E[**Home page**]
    B --> |Error, remain on...| F[**Login page**<br>User shown relevant error message]

```

#### Reset

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Reset password page**<br>User submits form...<br>Calls resetPassword action imported from...] --> B[**Auth actions**<br>resetPassword action validates form data...<br>Calls Supabase resetPasswordForEmail function...]
    B --> |Success, send password reset email to user...<br>User follows link in email to...| C[**Auth callback route**<br>Checks for Supabase code in search params...]
    C --> |If code, exchange for Supabase session, redirect to...| D[**Update password page**]
    C --> |If no code, redirect to... | E[**Error page**<br>User shown relevant error message]
    B --> |Error, remain on...| F[**Reset password page**<br>User shown relevant error message]

```

#### Update

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Update password page**<br>User submits form...<br>Calls updatePassword action from...] --> B[**Auth actions**<br>updatePassword action validates form data...<br>Calls Supabase updateUser function...]
    B --> |Success, redirect to...| C[**Auth success page**<br>User shown relevant success message]
    B --> |Error, remain on| D[**Update password page**<br>User shown relevant error message]

```

### Turnstile CAPTCHA verification

The signup, login, and reset password pages use Cloudflare Turnstile to perform CAPTCHA checks.

The Turnstile component rendered on each of these pages accesses the site key as an environment variable. When the user passes CAPTCHA, this component generates a token which is submitted along with the form data.

When the form is submitted and the relevant auth action called, this token is passed to the corresponding Supabase auth function. This function verifies the token with the Cloudflare Siteverify API, using the Cloudflare secret key stored as a Supabase environment variable.

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Auth page**<br>User loads page...<br>Turnstile component performs CAPTCHA check using site key...] --> |Calls...| B[**Auth action**<br>Calls relevant Supabase auth function...]
    B --> C[**Supabase server-side**<br>Attempts to verify Turnstile token with Cloudflare using secret key...]
    C --> |Success, auth action completes, redirect to...| D[**Next page**]
    C --> |Error, remain on...| E[**Auth page**<br>User shown relevant error message]
    A --> |Error, remain on...| E[**Auth page**<br>User shown relevant error message]

```

### Auth context

The `/contexts/AuthContext` file exports a context provider component (`AuthContext`), and a `useAuth` function, which returns a `user`, and `isLoggedIn` and `isLoading` boolean variables. Other files which need to use the `AuthContext` call the `useAuth` function.

This context is used by the Header component.

### Stripe data flows

Stripe sessions are created from the Workshops or WorkshopDetails pages by calling the createCheckoutSession action from `/actions/stripe`. This begins a Stripe checkout session, passes on success and cancellation URLs, and creates a new "in progress" workshop booking in Supabase.

On completion or expiration of the checkout session, Stripe sends the corresponding event to the `/api/webhooks/stripe` endpoint, which updates the matching booking in Supabase accordingly.

```mermaid
flowchart LR
%%{init: {'theme':'neutral'}}%%
    A[**Workshops/WorkshopDetails page**<br>User clicks Book now...<br>Calls createCheckoutSession action from...] --> B[**Stripe actions**<br>Checks for remaining places...<br>Checks for existing checkout session...]
    B --> |Success, create in progress booking, redirect to...| C[**Stripe checkout page**]
    C --> |User completes payment, user redirected to...| D[**Checkout success page**]
    C --> |User completes payment, Stripe sends completion event to...| E[**Stripe webhook endpoint**<br>Updates matching Supabase booking to confirmed OR deletes booking]
        C --> |User does not complete payment, Stripe sends expiry event to...| E
    C --> |User does not complete payment, user redirected to...| F[**Checkout cancellation page**]

```

## Testing

Individual elements of the app are tested using Jest unit tests. Critical integration flows, e.g. account creation and workshop bookings, are tested manually using the checklist at `/docs/manualTesting`.

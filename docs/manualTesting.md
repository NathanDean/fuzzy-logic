# Manual testing report

## Last tested: 25/05/2025 (commit aa655b0)

## Status: Ready / ***Ready with minor issues*** / Blocked

### Critical issues
- None

### Minor issues

- Signup: User can submit sign up form with email address associated with existing account
    - New user entry not created in database and no confirmation email sent
- Login: After submitting form with incorrect details, form will not submit successfully even with correct details until page refresh
- Update: User is logged in after updating password
    - Consider whether acceptable from security/UX POV, or whether user should be required to log in manually
- Account: Only lists date of first workshop for multi-date courses under Upcoming Workshops

# Stripe

## Describes: Single click on Book Now button

### Expect: Single booking to be created with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Successful payment

### Expect: Matching booking status === "confirmed"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: User to be redirected to success page
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Multiple clicks on Book Now button in same tab/window

### Expect: Single booking to be created with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Matching booking status === "confirmed" after payment
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Attempt to complete checkout session in multiple tabs/windows

### Expect: Single booking to be created with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Same booking status === "confirmed" after completing payment in second tab/window
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Exiting checkout session and returning to it before expiry

### Expect : Single booking to be in table with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Matching booking status === "confirmed" after payment
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Expired checkout session

### Expect: Matching booking to be deleted
- Passed from Workshops
- Passed from WorkshopDetails

## Describes: Failed payment

### Expect: Matching booking to be in table with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Matching booking to be deleted when checkout session expires
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: Multiple users attempt to book last place

### Expect: Both users to see Book Now button enabled
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: First user to proceed to checkout on clicking Book Now button
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Single booking for first user to be created with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Second user to see error message on clicking Book Now button
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: No booking to be created for second user
- Passed from Workshops
- Passed from WorkshopDetails


## Describes: User attempts to book while logged out

### Expect: User to be redirected to login page displayed "Please login to continue" message
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: User to be redirected to correct checkout page after successful login
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Single booking to be created with status === "in progress"
- Passed from Workshops
- Passed from WorkshopDetails

### Expect: Matching booking status === "confirmed" after payment
- Passed from Workshops
- Passed from WorkshopDetails


# Auth

## Describes: User attempts to submit signup form with missing field

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to fill in missing field
- Passed


## Describes: User attempts to sign up with email address already associated with an account

### Expect: Form to not be submitted
- Failed

### Expect: User to see message telling them that email address is already associated with an account
- Failed


## Describes: User attempts to submit signup form with mismatched passwords

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to match passwords
- Passed


## Describes: User attempts to submit signup form with full details including new email address and matching passwords

### Expect: Form to be submitted
- Passed

### Expect: User to be prompted to confirm email address
- Passed


## Describes: User attempts to submit login form with missing field

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to fill in missing field
- Passed


## Describes: User attempts to submit login form with invalid email

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to enter correct details
- Passed


## Describes: User attempts to submit login form with invalid password

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to enter correct details
- Passed


## Describes: User attempts to submit login form with correct details

### Expect: Form to be submitted
- Passed

### Expect: User to be successfully logged in
- Passed

### Expect: User to be redirected to Home page
- Passed


## Describes: User attempts to login from two different browseres simultaneously

### Expect: Form to be submitted in each browser
- Passed

### Expect: User to be successfully logged in in each browser
- Passed

### Expect: User to be redirected to Home page in each browser
- Passed


## Describes: User attempts to submit reset password form with email address that matches existing account

### Expect: Form to be submitted
- Passed

### Expect: User to be prompted to visit link in email
- Passed


## Describes: User attempts to submit update password form with missing field

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to match passwords
- Passed


## Describes: User attempts to submit update password form with mismatched passwords

### Expect: Form to not submitted
- Passed

### Expect: User to be prompted to match passwords
- Passed


## Describes: User attempts to submit update password form with matching passwords

### Expect: Form to be submitted
- Passed

### Expect: User to see message confirming password updated
- Passed

### Expect: User to be redirected to success page
- Passed

### Expect: Login attempt with new password to succeed
- Passed
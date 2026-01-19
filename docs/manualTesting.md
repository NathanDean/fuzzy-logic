# Manual testing report

## Last tested: 19/01/2025 (most recent commit: aad484d)

## Status: Ready / _**Ready with minor issues**_ / Blocked

### Critical issues

- None

### Minor issues

- User appears to already be logged in after updating password: not expected behaviour but not particularly problematic

# Stripe

## Describes: Single click on Book Now button

### Expect: Single booking to be created with status === "in progress"

- Passed from Workshops
- Passed from WorkshopDetails

## Describes: Multiple clicks on Book Now button in same tab/window

### Expect: Single booking to be created with status === "in progress"

- Passed from Workshops
- Passed from WorkshopDetails

## Describes: Successful payment

### Expect: Matching booking status === "confirmed"

- Passed

### Expect: User to be redirected to success page

- Passed

## Describes: Attempt to complete checkout session in multiple tabs/windows

### Expect: Single booking to be created with status === "in progress"

- Passed

### Expect: Same booking status === "confirmed" after completing payment in second tab/window

- Passed

## Describes: Exiting checkout session and returning to it before expiry

### Expect : Single booking to be in table with status === "in progress"

- Passed

### Expect: Matching booking status === "confirmed" after payment

- Passed

## Describes: Expired checkout session

### Expect: Matching booking to be deleted

- TBC

## Describes: Failed payment

### Expect: Matching booking to be in table with status === "in progress"

- TBC

### Expect: Matching booking to be deleted when checkout session expires

- TBC

## Describes: Multiple users attempt to book last place

### Expect: Both users to see Book Now button enabled

- Passed

### Expect: First user to proceed to checkout on clicking Book Now button

- Passed

### Expect: Single booking for first user to be created with status === "in progress"

- Passed

### Expect: Second user to see error message on clicking Book Now button

- Passed

### Expect: No booking to be created for second user

- Passed

## Describes: User attempts to book while logged out

### Expect: User to be redirected to login page displayed "Please login to continue" message

- Passed

### Expect: User to be redirected to correct checkout page after successful login

- Passed

### Expect: Single booking to be created with status === "in progress"

- Passed

# Auth

## Describes: User attempts to submit signup form with missing field

### Expect: Form to not submitted

- Passed

### Expect: User to be prompted to fill in missing field

- Passed

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

## Describes: User attempts multiple clicks on Sign up button

### Expect: Form to be disabled after first click

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

## Describes: User attempts multiple clicks on Login button

### Expect: Form to be disabled after first click

- Passed

## Describes: User attempts to submit reset password form with missing field

### Expect: Form to not submitted

- Passed

### Expect: User to be prompted to complete missing field

- Passed

## Describes: User attempts to submit reset password form with email address that does not match existing account

### Expect: Form to be submitted

- Passed

### Expect: User to be prompted to visit link in email

- Passed

## Describes: User attempts to submit reset password form with email address that matches existing account

### Expect: Form to be submitted

- Passed

### Expect: User to be prompted to visit link in email

- Passed

## Describes: User attempts multiple clicks on Reset password button

### Expect: Form to be disabled after first click

- Passed

## Describes: User attempts to submit update password form with missing field

### Expect: Submit button to be disabled

- Passed

## Describes: User attempts to submit update password form with mismatched passwords

### Expect: Form to not submitted

- Passed

### Expect: User to be prompted to match passwords

- Passed

## Describes: User attempts to submit update password form with matching passwords

### Expect: Form to be submitted

- Passed

### Expect: User to be redirected to success page with message confirming password updated

- Passed

### Expect: Login attempt with new password to succeed

- Passed

## Describes: User attempts multiple clicks on Update password button

### Expect: Form to be disabled after first click

- Passed

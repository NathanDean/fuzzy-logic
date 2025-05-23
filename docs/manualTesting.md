# Stripe - last tested after commit 520ca37

## Describes: Single click on Book Now button

### Expect: Single booking to be created with status === "in progress"
- Passed


## Describes: Successful payment

### Expect: Matching booking status === "confirmed"
- Passed


## Describes: Multiple clicks on Book Now button in same tab/window

### Expect: Single booking to be created with status === "in progress"
- Passed

### Expect: Matching booking status === "confirmed" after payment
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
- Passed


## Describes: Failed payment

### Expect: Matching booking to be in table with status === "in progress"
- Passed

### Expect: Matching booking to be deleted when checkout session expires
- Passed


## Describes: Multiple users attempt to book last place

### Expect: Both users to see Book Now button enabled
- Passed

### Expect: First user to proceed to checkout on clicking Book Now button
- Passed

### Expect: Single booking for first user to be created with status === "in progress"
- Passed

### Expect: Second user to encounter error on clicking Book Now button
- Passed

### Expect: No booking to be created for second user
- Passed


# Auth

## Describes: User attempts to submit signup form with missing field

### Expect: Form to not submitted
- TBC

### Expect: User to be prompted to fill in missing field
- TBC


## Describes: User attempts to sign up with email address already associated with an account

### Expect: Form to not be submitted
- TBC

### Expect: User to see message telling them that email address is already associated with an account
- TBC


## Describes: User attempts to submit signup form with mismatched passwords

### Expect: Form to not submitted
- TBC

### Expect: User to be prompted to match passwords
- TBC


## Describes: User attempts to submit signup form with full details including new email address and matching passwords

### Expect: Form to be submitted
- TBC

### Expect: User to be prompted to confirm email address
- TBC


## Describes: User attempts to submit login form with missing field

### Expect: Form to not submitted
- TBC

### Expect: User to be prompted to fill in missing field
- TBC


## Describes: User attempts to submit login form with incorrect details

### Expect: Form to not submitted
- TBC

### Expect: User to be prompted to enter correct details
- TBC


## Describes: User attempts to submit login form with correct details

### Expect: Form to be submitted
- TBC

### Expect: User to be successfully logged in
- TBC

### Expect: User to be redirected to Home page
- TBC


## Describes: User attempts to login from two different browseres simultaneously

### Expect: Form to be submitted in each browser
- TBC

### Expect: User to be successfully logged in in each browser
- TBC

### Expect: User to be redirected to Home page in each browser
- TBC


## Describes: User attempts to submit reset password form with email address that does not match existing account

### Expect: Form to not be submitted
- TBC

### Expect: User to be prompted to enter a matching email address
- TBC


## Describes: User attempts to submit reset password form with email address that matches existing account

### Expect: Form to be submitted
- TBC

### Expect: User to be prompted to visit link in email
- TBC


## Describes: User attempts to submit update password form with mismatched passwords

### Expect: Form to not submitted
- TBC

### Expect: User to be prompted to match passwords
- TBC


## Describes: User attempts to submit update password form with matching passwords

### Expect: Form to be submitted
- TBC

### Expect: User to see message confirming password updated
- TBC

### Expect: User to be redirected to Home page
- TBC
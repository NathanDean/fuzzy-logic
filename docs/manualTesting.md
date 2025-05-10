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
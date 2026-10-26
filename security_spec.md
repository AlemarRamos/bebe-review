# Security Specification: PNLE Pre-Board Simulation System

## 1. Data Invariants

1. **User Identity Boundary**: A student can only read, create, update, or delete their own user profile document (`/users/{userId}`) where `userId == request.auth.uid`.
2. **Attempt Ownership & Master Gate**: All exam attempts belong to the student who created them. Documents inside `/users/{userId}/attempts/{attemptId}` can only be read, created, or updated by the authenticated user whose `request.auth.uid == userId` and `incoming().userId == request.auth.uid`.
3. **Attempt Immutability & Safe Updates**:
   - `id`, `userId`, `startedAt`, and `examMode` cannot be modified after creation.
   - An attempt marked as `submitted` cannot have its `status` reverted back to `in_progress`.
4. **Bookmark Ownership**: Bookmarks in `/users/{userId}/bookmarks/{bookmarkId}` can only be accessed and manipulated by the authenticated student owning the path (`userId == request.auth.uid`).
5. **No Blanket Reads**: Reads to user data and attempts are restricted strictly to the verified owner. No public or cross-student reading is allowed.
6. **Input Boundaries & Denial of Wallet Guard**:
   - IDs must match `^[a-zA-Z0-9_-]+$` and `.size() <= 128`.
   - String fields must have `.size()` limits.
   - User profile emails cannot be forged; `incoming().email` must match `request.auth.token.email`.

## 2. The "Dirty Dozen" Malicious Payloads

1. **Spoofed User ID Write**: An attacker with UID `attacker_uid` attempts to write a user profile at `/users/victim_uid`.
2. **Ghost Field Injection (Shadow Update)**: Attempting to inject `isAdmin: true` into `/users/{userId}`.
3. **Attempt Tampering by Third Party**: Writing an exam attempt into `/users/{victimId}/attempts/{attemptId}` from a different auth token.
4. **Attempt ID Poisoning**: Using a 2KB garbage string for `attemptId` to cause resource exhaustion.
5. **Attempt UserID Hijacking**: Creating an attempt at `/users/{userId}/attempts/{attemptId}` where payload `userId` is someone else's ID (`attacker_uid != victim_uid`).
6. **State Step Regression**: Updating an attempt whose current status is `submitted` to revert it back to `in_progress`.
7. **Score Fabrication Attack**: Overwriting `percentage` without matching required action constraints or setting `percentage: "invalid_string"`.
8. **Unverified Auth Access**: Attempting writes when `request.auth.token.email_verified == false` (if email auth is used without verification).
9. **Global Document Query Scraping**: Attempting a collectionGroup query on `attempts` without scoping `resource.data.userId == request.auth.uid`.
10. **Bookmark Cross-Tenant Deletion**: Deleting another student's bookmark at `/users/{victimId}/bookmarks/{bm1}`.
11. **Excessive String Payload**: Inserting a 50,000-character string into `notes` in `UserBookmark`.
12. **Immutable Field Modification**: Updating an existing exam attempt while altering its original `startedAt` timestamp.

## 3. Test Runner Design (`firestore.rules.test.ts`)

A suite designed with `@firebase/rules-unit-testing` validating that:
- Operations failing invariants 1 through 12 trigger `PERMISSION_DENIED`.
- Valid student reads and writes to `/users/{userId}`, `/users/{userId}/attempts/{attemptId}`, and `/users/{userId}/bookmarks/{bookmarkId}` are permitted.

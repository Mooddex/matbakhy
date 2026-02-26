# Edit Profile — Code Review & Lessons

---

## 🔴 Critical Bug — The Response Shape Mismatch

Look at your `updateUser` fetch function. On success it returns `res.json()`, which is the raw user object from your API route — something like `{ _id: "...", name: "...", ... }`.

Now look at the component:

```ts
if (res.success) { ... }
```

That `success` property **does not exist** on the returned user object. This means the success branch **never runs** — the toast never fires, the dialog never closes — even when the update works perfectly in the database.

> **Lesson:** Always make sure the shape your function *returns* matches what the caller *expects*. Either have the API return `{ success: true, data: user }`, or check for the user object directly. Pick one convention and be consistent.

---

## 🔴 Security Issue — Mass Assignment Vulnerability

In your PATCH route:

```ts
const body = await req.json();
const user = await User.findOneAndUpdate({ firebaseUid }, body, { new: true });
```

You are passing the **raw request body directly into MongoDB**. This means a malicious user could send a request body like `{ "stats.rating": 5, "provider": "admin" }` and overwrite any field on the document — including fields that should never be user-controlled.

> **Lesson:** Always explicitly pick the fields you allow to be updated. Build a sanitized object like `{ name: body.name, bio: body.bio, ... }` and pass *that* to the DB, not the raw body. Also use `{ $set: sanitizedData }` explicitly.

---

## 🟠 Architectural Problem — Server Action Calling Its Own API

Your `updateUser` in `app/actions/user.ts` uses `"use server"` (implied by the import path) but internally does a `fetch` call to your own API route. This is an anti-pattern in Next.js.

A **server action** runs on the server — it can import your DB connection and Mongoose models directly. There's no need to make an HTTP round-trip to yourself. It adds latency, complexity, and a potential failure point.

> **Lesson:** Server actions should talk to the database directly (or through a service layer), not through `fetch` to your own routes. Your API routes are for external clients or client-side fetches. Your server actions are for form submissions from the client component.

---

## 🟠 Email Change Without Firebase Sync

Your form lets users change their email. But your `firebaseUid` is the identity anchor — the actual email in Firebase Auth is a separate system. If a user changes their email here, your MongoDB will show one email and Firebase will show a different one. Over time this causes real bugs (e.g. login issues, notification mismatches).

> **Lesson:** Either disable email editing in this form, or when you update email you must also update it in Firebase using the Admin SDK on the server side. These two systems need to stay in sync.

---

## 🟡 Schema Contains `password` But Form Does Not

Your `EditProfileSchema` has a `password` field, but your form has no password input. This is confusing and signals that the schema is being reused for something it wasn't designed for — or that the password field was added speculatively.

More importantly, profile updates and password changes should **never** be handled by the same endpoint. Password changes require current password confirmation, re-authentication, and hashing. Mixing them into a profile update is a design smell.

> **Lesson:** Keep schemas focused. One schema for profile info, a completely separate flow for password changes.

---

## 🟡 `console.log(data)` in submitHandler

```ts
const submitHandler = async (data: TEditProfileSchema) => {
  console.log(data); // 👈 this logs email, phone, and personal data
```

You're logging the entire form payload, which contains personal user data. This is fine during development but should never go to production.

> **Lesson:** Get in the habit of removing debug logs before committing. Or use a proper logger that's disabled in production.

---

## 🟡 Form Fields Don't Match Schema Fields

Your schema defines `avatar`, `phone`, `location`, and `bio` — but none of those have inputs in the form. The `defaultValues` set them, but users can never change them. Either render the inputs or remove them from this form and schema.

---

## 🟢 Minor — Headless UI Dialog Backdrop

You're manually wrapping the panel in a `div` with `bg-black/40` to create a backdrop. Headless UI has a `DialogBackdrop` component for this — it handles accessibility attributes and transitions properly.

---

## 📚 What to Study Next

| Topic | Why It Matters |
|---|---|
| Server Actions vs API Routes in Next.js | Fix the fetch-inside-action anti-pattern |
| Mass assignment & input sanitization | Protect your DB from malicious payloads |
| Response shape consistency | Fix the `res.success` bug and avoid similar ones |
| Firebase Admin SDK | Handle email sync between Firebase and MongoDB |
| Zod schema design | Keep schemas single-purpose and focused |
| Headless UI Dialog components | Build accessible, correct modal structures |
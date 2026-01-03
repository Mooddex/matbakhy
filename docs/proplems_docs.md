Here’s the same documentation formatted as **Markdown** for your project:

````md
# 📝 ProfilePage NotFound Issue in Next.js App Router (Dev)

## Context
- Next.js 15 App Router project
- `ProfilePage` is a **server component** that fetches user data from `/api/users/:id` using a `getUser` helper
- API returns the full user object correctly
- `ProfileCard` expects a `user: User` object

---

## Problem
- Visiting `/profile/:firebaseUid` **always rendered `<NotFound />`** in development
- API works: `/api/users/:id` returns correct JSON
- `ProfilePage` uses `getUser(id)` to fetch data
- `getUser` was written as:

```ts
const res = await fetch(`/api/users/${id}`, { cache: "no-store" });
````

---

## Root Cause

* **Server-side fetch cannot reliably use relative URLs (`/api/...`)** in server components

  * Server-side code runs on **Node**, not the browser
  * Relative paths are interpreted in Node context → fetch fails → `getUser` throws → `<NotFound />` triggers
* API, database, and ProfileCard were fine

---

## Solution

1. Use an **absolute URL** for server-side fetch:

```ts
const baseUrl = "http://localhost:3000"; // Dev environment
const res = await fetch(`${baseUrl}/api/users/${id}`, { cache: "no-store" });
```

2. Optional: use environment variable for production:

```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const res = await fetch(`${baseUrl}/api/users/${id}`, { cache: "no-store" });
```

3. Add error logging for debugging:

```ts
if (!res.ok) {
  console.error("Fetch failed:", res.status, await res.text());
  throw new Error("User not found");
}
```

---

## Key Takeaways

* **Server components cannot use relative fetch URLs**; always use absolute URLs in server-side code
* Client-side code (`"use client"`) can safely use relative URLs
* Environment variables (`NEXT_PUBLIC_SITE_URL`) help switch between dev and prod
* Logging fetch failures makes debugging easier

---

## Final Working `getUser` (Development)

```ts
export const getUser = async (id: string) => {
  const baseUrl = "http://localhost:3000"; // dev server
  const res = await fetch(`${baseUrl}/api/users/${id}`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Fetch failed:", res.status, await res.text());
    throw new Error("User not found");
  }

  return res.json();
};
```

✅ This ensures `ProfilePage` receives the user object correctly, and `<NotFound />` only triggers if the user truly does not exist.
```
Here’s a concise **cheat sheet / best practice note** for server-side fetches in Next.js App Router:

````md
# ⚡ Server-Side Fetch Cheat Sheet (Next.js App Router)

## Development
- Always use **absolute URLs** in server components:
```ts
const res = await fetch(`http://localhost:3000/api/your-endpoint`, { cache: "no-store" });
````

* Relative URLs like `/api/...` **may fail** on server-side

## Production

* Use environment variable for domain:

```ts
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const res = await fetch(`${baseUrl}/api/your-endpoint`, { cache: "no-store" });
```

* Ensures server-side fetch works on any deployed domain

## Notes

* `"use client"` modules can safely use **relative URLs** (e.g., `fetch("/api/...")`)
* Always log fetch failures in server components:

```ts
if (!res.ok) console.error("Fetch failed:", res.status, await res.text());
```

* This prevents silent failures and unexpected `<NotFound />` renders

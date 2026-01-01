## 🔐 Authentication Flow (Firebase → MongoDB)

### 1️⃣ User Action
**User clicks “Sign in with Google”**  
→ From the Next.js frontend

---

### 2️⃣ Google Authentication
- Firebase Auth opens Google OAuth popup  
- User selects Google account  
- Firebase returns:
  - `uid`
  - `email`
  - `name`
  - `photoURL`

---

### 3️⃣ Frontend → Backend
The client sends user data to:


POST /api/auth/sync-user


---

### 4️⃣ Backend Processing
- Server checks MongoDB:
  - Does a user with this `firebaseUid` exist?

✅ **If YES** → return existing user  
🆕 **If NO** → create new user document

```ts
{
  firebaseUid,
  name,
  email,
  role,
  createdAt
}
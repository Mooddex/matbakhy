# MongoDB and Firebase Integration Documentation

## Overview
This application uses a hybrid database architecture combining **Firebase** for authentication and **MongoDB** for data persistence. Firebase handles user authentication, while MongoDB stores application data including user profiles, kitchen listings, and user statistics.

---

## Architecture

### Technology Stack
- **Firebase**: Authentication, JWT token management, and OAuth (Google Sign-In)
- **MongoDB**: Primary database for storing user profiles and application data
- **Next.js**: Full-stack framework connecting both services
- **Mongoose**: ODM (Object Document Mapper) for MongoDB schema management

---

## Firebase Setup

### Firebase Configuration
**File**: [lib/firebase/firebase-config.ts](lib/firebase/firebase-config.ts)

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

**Key Features:**
- Firebase app is initialized once and reused across the application
- Exports `auth` (Firebase Authentication instance)
- Exports `db` (Firestore instance - used for reading auth state)
- All sensitive credentials are loaded from environment variables

### Firebase Modules Exported
- `auth`: Used for all authentication operations (sign-up, sign-in, Google OAuth)
- `db`: Firestore instance (for potential real-time features)

---

## MongoDB Setup

### Database Connection
**File**: [lib/db/db.ts](lib/db/db.ts)

```typescript
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
};
```

**Key Features:**
- Connection reuse: Only connects if not already connected (`readyState >= 1`)
- MongoDB URI loaded from `MONGO_URI` environment variable
- Called on-demand before database operations

---

## User Model and Data Structure

### Mongoose User Schema
**File**: [lib/models/Users.ts](lib/models/Users.ts)

```typescript
{
  name: String (required),
  username: String (unique, sparse),
  email: String (unique, required),
  password: String (optional - for email/password auth),
  firebaseUid: String (unique, required) ← Links to Firebase UID
  provider: String (default: "credentials"),
  phone: String,
  location: String,
  bio: String,
  avatar: String,
  stats: {
    totalKitchens: Number,
    totalViews: Number,
    rating: Number,
    completedOrders: Number,
  }
}
```

### Key Design Decision: `firebaseUid`
The `firebaseUid` field is the **critical link** between Firebase and MongoDB:
- Stores the unique Firebase UID for each user
- Marked as `unique` and `required`
- Sparse index allows for future social auth implementations
- Enables user lookup by Firebase UID

---

## Authentication Flow

### 1. Email/Password Sign-Up
**File**: [lib/firebase/auth/signup.tsx](lib/firebase/auth/signup.tsx)

**Flow:**
1. User creates account with email and password
2. Firebase creates user via `createUserWithEmailAndPassword()`
3. User data is sent to MongoDB with:
   - `firebaseUid`: Firebase user's UID
   - `email`: User's email
   - `name`: User's name
   - `provider`: Set to `"email"`
   - `username`: Generated from email prefix
   - Initial `stats` object
4. User object is saved to MongoDB via [app/actions/user.ts](app/actions/user.ts)

**Code Flow:**
```typescript
// 1. Firebase creates user
const result = await createUserWithEmailAndPassword(auth, email, password);
const firebaseUser = result.user;

// 2. Prepare MongoDB user object
const user: User = {
  firebaseUid: firebaseUser.uid,  // Link to Firebase
  email: firebaseUser.email,
  name: name,
  // ... other fields
};

// 3. Save to MongoDB
await createUser(user);  // POST /api/users
```

### 2. Email/Password Sign-In
**File**: [lib/firebase/auth/signin.tsx](lib/firebase/auth/signin.tsx)

**Flow:**
1. Firebase authenticates user via `signInWithEmailAndPassword()`
2. Returns Firebase user object
3. User session managed through JWT tokens

### 3. Google OAuth Sign-In
**File**: [lib/firebase/auth/GoogleAuth.tsx](lib/firebase/auth/GoogleAuth.tsx)

**Flow:**
1. User clicks "Continue with Google" button
2. Firebase opens Google auth popup via `signInWithPopup()`
3. After successful Google authentication, sends user data to backend
4. Backend endpoint [app/api/users/google/route.ts](app/api/users/google/route.ts) receives:
   - `uid`: Firebase user UID
   - `email`: Google email
   - `name`: Google display name
   - `avatar`: Google profile picture
5. Backend checks if user exists in MongoDB
6. If new user: Creates MongoDB record with `provider: "google"`
7. Returns user data from MongoDB

**Code Flow:**
```typescript
// 1. Google OAuth via Firebase
const result = await signInWithPopup(auth, provider);
const user = result.user;

// 2. Send to backend
const res = await fetch("/api/users/google", {
  method: "POST",
  body: JSON.stringify({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    avatar: user.photoURL,
  }),
});

// 3. Backend creates or fetches user
// POST /api/users/google handles upsert logic
```

---

## API Routes for Data Persistence

### User Creation
**File**: [app/api/users/route.ts](app/api/users/route.ts)

```typescript
POST /api/users
- Connects to MongoDB
- Creates new user document
- Returns created user (201 status)

GET /api/users
- Connects to MongoDB
- Returns all users (password field excluded)
```

### Google Auth Endpoint
**File**: [app/api/users/google/route.ts](app/api/users/google/route.ts)

```typescript
POST /api/users/google
- Receives Firebase user data from frontend
- Checks if user exists by email
- Creates new user if doesn't exist
- Returns user from MongoDB
```

### User Lookup by ID
**File**: [app/api/users/[id]/route.ts](app/api/users/[id]/route.ts)

- Fetches user by Firebase UID
- Used by `AuthProvider` to fetch MongoDB user data

---

## Authentication State Management

### AuthProvider Context
**File**: [lib/firebase/auth/AuthProvider.tsx](lib/firebase/auth/AuthProvider.tsx)

**Purpose**: Manages global authentication state across the application

**Key Features:**
```typescript
- Listens to Firebase auth state changes via onAuthStateChanged()
- When user logs in:
  1. Receives Firebase user from Firebase
  2. Fetches corresponding MongoDB user by UID
  3. Attaches MongoDB _id to user object
  4. Updates global context
- Provides useAuth() hook for components
```

**Usage:**
```typescript
const { user, loading } = useAuth();
// user contains both Firebase data + MongoDB _id
```

---

## User Actions Service

**File**: [app/actions/user.ts](app/actions/user.ts)

Centralized API client for user operations:

| Function | Method | Endpoint | Purpose |
|----------|--------|----------|---------|
| `createUser()` | POST | `/api/users` | Save new user to MongoDB |
| `getUsers()` | GET | `/api/users` | Fetch all users |
| `getUser()` | GET | `/api/users/{id}` | Fetch single user by Firebase UID |
| `updateUser()` | PATCH | `/api/users/{id}` | Update user profile |
| `deleteUser()` | DELETE | `/api/users/{id}` | Delete user account |

---

## Environment Variables Required

Create a `.env.local` file with:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Data Flow Diagram

### Sign-Up Flow
```
User Form
   ↓
Firebase (createUserWithEmailAndPassword)
   ↓
Firebase User Created (UID generated)
   ↓
Send to /api/users (with firebaseUid)
   ↓
MongoDB User Created
   ↓
User logged in
```

### Sign-In Flow
```
User Credentials
   ↓
Firebase (signInWithEmailAndPassword)
   ↓
Firebase Session Created (JWT)
   ↓
AuthProvider listens (onAuthStateChanged)
   ↓
Fetch user from MongoDB (by firebaseUid)
   ↓
Global auth context updated
   ↓
User data available across app
```

### Google OAuth Flow
```
User clicks "Continue with Google"
   ↓
Firebase (signInWithPopup)
   ↓
Google OAuth popup
   ↓
Firebase User Created/Updated
   ↓
Send to /api/users/google (with uid, email, name, avatar)
   ↓
MongoDB Upsert (find by email, create if new)
   ↓
Return MongoDB user
   ↓
User logged in
```

---

## Key Integration Points

1. **Firebase UID as Primary Link**
   - Every MongoDB user has a `firebaseUid` field
   - This is how we sync Firebase auth state with MongoDB data

2. **Dual Authentication System**
   - Firebase: Handles credentials, OAuth, sessions
   - MongoDB: Stores user profile data, extends user info

3. **AuthProvider as Bridge**
   - Listens to Firebase auth state
   - Fetches MongoDB user data when auth changes
   - Makes both Firebase and MongoDB data available globally

4. **API Endpoints as Synchronizers**
   - Backend routes handle MongoDB writes
   - Frontend sends Firebase data to these routes
   - Routes sync Firebase auth with MongoDB data

---

## Security Considerations

✅ **What's Protected:**
- Firebase handles password hashing and secure auth
- MongoDB passwords excluded from API responses
- Firebase UID is non-reusable and unique
- Google OAuth credentials handled by Firebase

⚠️ **Best Practices Implemented:**
- `NEXT_PUBLIC_*` prefix only for public Firebase config
- Sensitive data (MONGO_URI) in server-only env variables
- MongoDB connection reused to prevent resource leaks
- Passwords optional (for OAuth users who don't have email/password)

---

## Potential Enhancements

1. **Add Firestore instead of Firestore just for auth state**
   - Current: Firestore `db` exported but not actively used
   - Future: Could use Firestore for real-time data sync

2. **Implement refresh token rotation**
   - Enhance JWT strategy in [auth.config.ts](auth.config.ts)

3. **Add account linking**
   - Allow users to connect multiple auth providers
   - Leverage `provider` field in MongoDB schema

4. **Email verification**
   - Integrate Firebase email verification
   - Add verification status to MongoDB schema

5. **Add OAuth providers**
   - GitHub, Microsoft, Apple
   - Follow same pattern as Google auth

---

## Troubleshooting

### User created in Firebase but not in MongoDB
- Check if signup function called `createUser()`
- Verify `/api/users` endpoint is accessible
- Check MongoDB connection and MONGO_URI

### User not found when fetching from MongoDB
- Verify `firebaseUid` matches between Firebase and MongoDB
- Check API route [app/api/users/[id]/route.ts](app/api/users/[id]/route.ts)
- Ensure database connection before queries

### Google OAuth creates duplicate users
- Current implementation: Checks if email exists before creating
- If email exists, returns existing user instead of creating new

### Auth state not persisting across page reloads
- Check if `AuthProvider` wraps entire app in [app/layout.tsx](app/layout.tsx)
- Verify Firebase config is loaded from environment variables
- Check browser localStorage isn't cleared

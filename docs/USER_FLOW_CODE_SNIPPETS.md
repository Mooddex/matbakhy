# User Flow: Create & Sign-On

Complete flow of creating a user in MongoDB and retrieving it during sign-on.

---

## Part 1: Sign-Up (Create User)

### Step 1: Firebase Creates User
**File**: `lib/firebase/auth/signup.tsx`

```typescript
result = await createUserWithEmailAndPassword(auth, email, password);
const firebaseUser = result.user;

const user: User = {
  firebaseUid: firebaseUser.uid,
  email: firebaseUser.email || '',
  name: name,
  provider: 'email',
  stats: { totalKitchens: 0, totalViews: 0, rating: 0, completedOrders: 0 },
};

await createUser(user);
```

### Step 2: Send to Backend
**File**: `app/actions/user.ts`

```typescript
export const createUser = async (data: User) => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
```

### Step 3: Save to MongoDB
**File**: `app/api/users/route.ts`

```typescript
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json(user, { status: 201 });
}
```

### Step 4: MongoDB Schema
**File**: `lib/models/Users.ts`

```typescript
const UserSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  provider: { type: String, default: "credentials" },
  stats: {
    totalKitchens: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
  },
}, { timestamps: true });
```

---

## Part 2: Sign-On (Retrieve User)

### Step 1: Firebase Authenticates
**File**: `lib/firebase/auth/signin.tsx`

```typescript
result = await signInWithEmailAndPassword(auth, email, password);
```

### Step 2: AuthProvider Listens to Auth Changes
**File**: `lib/firebase/auth/AuthProvider.tsx`

```typescript
const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const res = await fetch(`/api/users/${firebaseUser.uid}`);
    const mongoUser = await res.json();
    const userWithId = Object.assign(firebaseUser, { _id: mongoUser._id });
    setUser(userWithId);
  }
});
```

### Step 3: Fetch from MongoDB
**File**: `app/api/users/[id]/route.ts`

```typescript
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const user = await User.findOne({ firebaseUid: id }).select("-password");
  return NextResponse.json(user);
}
```

### Step 4: Database Connection
**File**: `lib/db/db.ts`

```typescript
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGO_URI!);
};
```

---

## Flow Summary

```
SIGN-UP:
User Form → Firebase (createUserWithEmailAndPassword) 
→ Get firebaseUid → POST /api/users → MongoDB saves with firebaseUid

SIGN-ON:
User Form → Firebase (signInWithEmailAndPassword) → Get firebaseUid
→ AuthProvider listens (onAuthStateChanged) → GET /api/users/:firebaseUid
→ MongoDB returns user → Context provides user globally
```

### Key Link: `firebaseUid`
- Unique identifier from Firebase stored in MongoDB
- Enables quick lookup: `User.findOne({ firebaseUid: id })`
- Syncs Firebase auth with MongoDB data


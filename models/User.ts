import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  hashedPassword: string;
  image?: string | null;
  provider?: string;
  providerId?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  provider: {
    type: String,
    default: "credentials",
  },
  providerId: {
    type: String,
    default: null,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt
});

// Create indexes
UserSchema.index({ email: 1 });
UserSchema.index({ providerId: 1, provider: 1 });

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
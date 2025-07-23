// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose'

// Define the IUser interface for type safety
export interface IUser {
  username: string
  email: string
  password: string
  // …any other fields…
}

// Create the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // …additional fields…
  },
  { timestamps: true }
)

// Prevent model overwrite upon hot reload and export
export const User = models.user || model<IUser>('user', userSchema)

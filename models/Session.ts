// models/Session.ts
import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' }, // expires after 7 days
})

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema)

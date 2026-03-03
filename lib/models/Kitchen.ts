import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * IKitchen extends Document for MongoDB/Mongoose
 * - _id: Automatically assigned by MongoDB as ObjectId
 * - userId: Firebase UID of the kitchen maker (required)
 */
export interface IKitchen extends Document {
  _id: mongoose.Types.ObjectId; // MongoDB ObjectId
  name: string;
  maker: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: string;
  imageUrl: string;
  userId: string; // Firebase UID of the kitchen maker
  createdAt: Date;
  updatedAt: Date;
}

const KitchenSchema = new Schema<IKitchen>(
  {
    name:        { type: String, required: true },
    maker:       { type: String, required: true },
    price:       { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    description: { type: String, required: true },
    location:    { type: String, required: true },
    imageUrl:    { type: String, required: true },
    userId:      { type: String, required: true }, // Firebase UID of the kitchen maker
  },
  { timestamps: true }
);

const Kitchen: Model<IKitchen> =
  mongoose.models.Kitchen || mongoose.model<IKitchen>("Kitchen", KitchenSchema);

export default Kitchen;
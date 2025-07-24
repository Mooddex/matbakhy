import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IKitchen extends Document {
  name: string;
  maker: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const kitchenSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    maker: { type: String, required: true },
    price: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Kitchen || model<IKitchen>("Kitchen", kitchenSchema);

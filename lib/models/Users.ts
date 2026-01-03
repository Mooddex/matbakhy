import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true, // allows null until user sets it
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      
    },
    firebaseUid: {
     type: String,
      unique: true,
      sparse: true,
      required: true, 

    },


    provider: {
      type: String,
      default: "credentials",
    },

    phone: String,
    location: String,
    bio: String,
    avatar: String,

    stats: {
      totalKitchens: { type: Number, default: 0 },
      totalViews: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      completedOrders: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

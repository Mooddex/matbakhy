import * as z from "zod";
// Base schema for fields
const KitchenBaseSchema = z.object({
  name: z
    .string()
    .min(2, "At least two characters")
    .startsWith("@", "Username must start with (@)")
    .regex(/^[a-zA-Z0-9_@]+$/, "Only letters, numbers, and underscores are allowed")
    ,
  maker: z.string().min(1, "Maker is required"),
  price: z.number().positive("Price must be positive").min(1000, "Price must be at least 1000"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.number("Invalid phone number format, Must start with +"),
  imageUrl: z.url("Invalid URL"),
});

// Add schema (no id)
export const AddKitchenSchema = KitchenBaseSchema;
export type TAddKitchenSchema = z.infer<typeof AddKitchenSchema>;

// Edit schema (id required)
export const EditKitchenSchema = KitchenBaseSchema.extend({
  id: z.string("Invalid ID format"), // or z.string().cuid() depending on your ID format
});
export type TEditKitchenSchema = z.infer<typeof EditKitchenSchema>;

export const EditProfileSchema = z.object({
  firebaseUid: z.string(),

  username: z.string().min(3, "Username must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),

  name: z.string().min(1, "Name is required"),

  avatar: z
    .string()
    .url("Invalid avatar URL")
    .optional()
    .or(z.literal("")),

  phone: z.string().optional(),

  location: z.string().optional(),

  bio: z.string().optional(),
});

export type TEditProfileSchema = z.infer<typeof EditProfileSchema>;
import * as z from "zod";

// Base schema for fields
const KitchenBaseSchema = z.object({
  name: z
    .string()
    .min(2, "At least two characters")
    .startsWith("@", "Username must start with (@)"),
  maker: z.string().min(1, "Maker is required"),
  price: z.number().positive("Price must be positive").min(1000, "Price must be at least 1000"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.e164("Invalid phone number format, Must start with +"),
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
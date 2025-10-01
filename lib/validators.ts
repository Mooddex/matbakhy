import * as z from "zod";

//  Base schema for fields
const KitchenBaseSchema = z.object({
  name: z
    .string()
    .min(2, "At least Two Characters")
    .startsWith("@", "Username Must start With (@)"),
  maker: z.string(),
  price: z.number().min(4, "Must At Least Be 4 Numbers"),
  description: z.string(),
  location: z.string(),
  phoneNumber: z.number().min(8),
imageUrl: z.string().url("Invalid URL"),
});

// Add schema (no id)
export const AddKitchenSchema = KitchenBaseSchema;
export type TAddKitchenSchema = z.infer<typeof AddKitchenSchema>;

// Edit schema (id required)
export const EditKitchenSchema = KitchenBaseSchema.extend({
});
export type TEditKitchenSchema = z.infer<typeof EditKitchenSchema>;





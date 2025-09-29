import * as z from "zod";

//  Base schema for fields
const KitchenBaseSchema = z.object({
  name: z
    .string()
    .min(2, "At least Two Characters")
    .endsWith("@", "Username Must End With (@)"),
  maker: z.string(),
  price: z.string().min(4, "Must At Least Be 4 Numbers"),
  description: z.string(),
  location: z.string(),
  phoneNumber: z.string(),
imageUrl: z.string().url("Invalid URL"),
});

// Add schema (no id)
export const AddKitchenSchema = KitchenBaseSchema;
export type TAddKitchenSchema = z.infer<typeof AddKitchenSchema>;

// Edit schema (id required)
export const EditKitchenSchema = KitchenBaseSchema.extend({
});
export type TEditKitchenSchema = z.infer<typeof EditKitchenSchema>;

//product
const ProductBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().nonnegative("Price cannot be negative"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),

});

// Add schema (no id)
export const AddProductSchema = ProductBaseSchema;
export type TAddProductSchema = z.infer<typeof AddProductSchema>;

// Edit schema (id required)
export const EditProductSchema = ProductBaseSchema;

export type TEditProductSchema = z.infer<typeof EditProductSchema>;




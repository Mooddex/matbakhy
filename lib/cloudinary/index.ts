/**
 * Cloudinary is used for image uploads via the client-side widget (next-cloudinary).
 * Uploaded images return a secure_url which is stored in Firestore as imageUrl/avatar.
 *
 * Required env vars:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
};

export const isCloudinaryConfigured = Boolean(
  cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset
);

"use client";

import { useState } from "react";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function usePhotoForm() {
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoUpload = async (file: File) => {
    setPhotoError(null);

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setPhotoError(
        `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`,
      );
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setPhotoData(base64);
    } catch (error) {
      console.error("Conversion error:", error);
      setPhotoError("Error processing photo.");
    }
  };

  const clearPhoto = () => {
    setPhotoData(null);
    setPhotoError(null);
  };

  return {
    photoData,
    photoError,
    handlePhotoUpload,
    clearPhoto,
  };
}

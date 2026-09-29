
"use client";

import { useState, ChangeEvent, SubmitEvent } from "react";
import { analyzeApplication } from "../../lib/api";
import type { AnalysisResponse } from "../../types/analysis";
import { usePhotoForm } from "../../hooks/usePhotoForm";

export function useApplicationForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const { photoData, photoError, handlePhotoUpload, clearPhoto } =
    usePhotoForm();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvFile(e.target.files[0]);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file); 
      handlePhotoUpload(file); 
    } else {
      setPhotoFile(null);
      clearPhoto();
    }
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!cvFile) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeApplication(jobDescription, cvFile);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while connecting to the server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    jobDescription,
    setJobDescription,
    cvFile,
    photoFile, 
    photoData,
    photoError,
    loading,
    error,
    result,
    handleFileChange,
    handlePhotoChange,
    clearPhoto,
    handleSubmit,
  };
}
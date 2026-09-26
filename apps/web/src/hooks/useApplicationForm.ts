"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { analyzeApplication } from "../lib/api";
import type { AnalysisResponse } from "../types/analysis";

export function useApplicationForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
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
    loading,
    error,
    result,
    handleFileChange,
    handleSubmit,
  };
}

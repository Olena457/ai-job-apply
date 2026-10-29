

"use client";

import { useState, ChangeEvent, SubmitEvent } from "react";
import { analyzeMatch } from "../lib/api";
import type { AnalysisResponse } from "@/types/analysis";
import { usePhotoForm } from "./usePhotoForm";
import { isAppConfigured } from "../lib/keysStorage";

export function useApplicationForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  
  const [inputMode, setInputMode] = useState<"pdf" | "text">("pdf");
  const [manualText, setManualText] = useState("");

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const {
    photoData,
    photoError,
    handlePhotoUpload,
    clearPhoto: resetPhotoHook,
  } = usePhotoForm();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCvFile(e.target.files[0]);
  };
const handleClearFile = () => {
  setCvFile(null);
};
  const handlePhotoChange = (file: File) => {
    setPhotoFile(file);
    handlePhotoUpload(file);
  };

  const handleClearPhoto = () => {
    setPhotoFile(null);
    resetPhotoHook();
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAppConfigured()) {
      setError(
        "Please enter your Gemini API Key or admin password in Settings.",
      );
      return;
    }

    if (inputMode === "pdf" && !cvFile) {
      setError("Please upload your PDF resume.");
      return;
    }

    if (inputMode === "text" && !manualText.trim()) {
      setError("Please enter your skills or bio.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let fileToSend = cvFile;

      if (inputMode === "text" && manualText.trim()) {
        fileToSend = new File([manualText], "candidate_skills.txt", {
          type: "text/plain",
        });
      }

      if (!fileToSend) {
        throw new Error("No resume file or skills text provided.");
      }

      const data = await analyzeMatch(jobDescription, fileToSend, companyName);
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
    companyName,
    setCompanyName,
    inputMode,
    setInputMode,
    manualText,
    setManualText,
    cvFile,
    clearFile: handleClearFile,
    photoFile,
    photoData,
    photoError,
    loading,
    error,
    result,
    handleFileChange,
    handlePhotoChange,
    clearPhoto: handleClearPhoto,
    handleSubmit,
  };
}
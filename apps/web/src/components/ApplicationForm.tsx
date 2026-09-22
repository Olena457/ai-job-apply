"use client";

import { useState } from "react";

export default function ApplicationForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: I need to connect this to my NestJS backend later.
    // The API will trigger the LangGraph/LangChain flow to research the company,
    // calculate the match percentage, and generate the tailored CV PDF and Cover Letter.
    console.log("Submitting form data:", { jobDescription, cvFile });

    // Temporary alert for testing the UI
    alert("Data submitted for processing");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="jobDescription" style={{ fontWeight: "bold" }}>
          Job Description, Company Name, or Link
        </label>
        <textarea
          id="jobDescription"
          rows={6}
          placeholder="Output the job description, company name, or a link to the job posting here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label htmlFor="cvUpload" style={{ fontWeight: "bold" }}>
          your  CV (format PDF)
        </label>
        <input
          type="file"
          id="cvUpload"
          accept=".pdf"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
          required
          style={{ padding: "0.5rem" }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Analyze and Generate CV + Cover Letter
      </button>
    </form>
  );
}

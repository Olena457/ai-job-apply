"use client";

import { useState } from "react"; // 1. Додано імпорт useState
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Sparkles } from "lucide-react";
import { useApplicationForm } from "../../hooks/useApplicationForm";
import FileUploader from "../ui/FileUploader";
import PhotoUploader from "../ui/PhotoUploader";
import AnalysisResult from "../results/AnalysisResult";
import AiLoader from "../ui/AiLoader";
import CompanyInput from "../ui/CompanyInput";
import ThemeColorPicker from "./ThemeColorPicker"; 

export default function ApplicationForm() {
  const {
    jobDescription,
    setJobDescription,
    companyName,
    setCompanyName,
    cvFile,
    photoData,
    photoError,
    loading,
    error,
    result,
    handleFileChange,
    handlePhotoChange,
    clearPhoto,
    handleSubmit,
  } = useApplicationForm();

  const [themeColor, setThemeColor] = useState("#5a85b5");

  return (
    <>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 4, maxWidth: 700, mx: "auto" }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <CompanyInput value={companyName} onChange={setCompanyName} />

            <TextField
              id="jobDescription"
              label="Job Description or Requirements"
              placeholder="Paste the full job description here..."
              multiline
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              fullWidth
            />

            <FileUploader cvFile={cvFile} onFileChange={handleFileChange} />

            <PhotoUploader
              photoData={photoData}
              error={photoError}
              onUpload={handlePhotoChange}
              onClear={clearPhoto}
            />

            <ThemeColorPicker
              selectedColor={themeColor}
              onChange={setThemeColor}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading || !cvFile}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Sparkles size={20} />
                )
              }
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              {loading ? "Analyzing Match..." : "Analyze Match"}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ mt: 4, animation: "fadeIn 0.5s ease-in" }}>
          <AiLoader />
        </Box>
      )}

      {result && !loading && (
        <Box sx={{ mt: 4 }}>
          <AnalysisResult
            data={result}
            photoData={photoData}
            themeColor={themeColor}
          />
        </Box>
      )}
    </>
  );
}

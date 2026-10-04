
"use client";

import { useState } from "react";
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
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          bgcolor: "#ffffff",
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: "stretch" }}
            >
              <Box sx={{ flex: 1, display: "flex" }}>
                <CompanyInput value={companyName} onChange={setCompanyName} />
              </Box>

              <Box sx={{ flex: 1, display: "flex" }}>
                <FileUploader cvFile={cvFile} onFileChange={handleFileChange} />
              </Box>
            </Stack>

            <TextField
              id="jobDescription"
              label="Job Description or Requirements"
              placeholder="Paste the full job description here..."
              multiline
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              fullWidth
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: "stretch" }}
            >
              <Box sx={{ flex: 1, display: "flex" }}>
                <PhotoUploader
                  photoData={photoData}
                  error={photoError}
                  onUpload={handlePhotoChange}
                  onClear={clearPhoto}
                />
              </Box>

              <Box sx={{ flex: 1, display: "flex" }}>
                <ThemeColorPicker
                  selectedColor={themeColor}
                  onChange={setThemeColor}
                />
              </Box>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ py: 0.5 }}>
                {error}
              </Alert>
            )}

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
                fontWeight: 700,
                fontSize: "1.05rem",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                },
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
    </Box>
  );
}
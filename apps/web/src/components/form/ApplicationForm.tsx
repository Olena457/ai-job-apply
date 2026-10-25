


"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
} from "@mui/material";
import { Sparkles } from "lucide-react";
import { useApplicationForm } from "../../hooks/useApplicationForm";
import FileUploader from "../ui/FileUploader";
import PhotoUploader from "../ui/PhotoUploader";
import AnalysisResult from "../results/AnalysisResult";
import AiLoader from "../ui/AiLoader";
import CompanyInput from "../ui/CompanyInput";
import JobDescriptionInput from "../ui/JobDescriptionInput";
import ThemeColorPicker from "./ThemeColorPicker";
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

export default function ApplicationForm() {
  const {
    jobDescription,
    setJobDescription,
    companyName,
    setCompanyName,
    inputMode,
    setInputMode,
    manualText,
    setManualText,
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

  const [themeColor, setThemeColor] = useState("#608abf");

  const isFormValid = inputMode === "pdf" ? !!cvFile : !!manualText.trim();

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: `1px solid ${COLORS.border}`,
          bgcolor: COLORS.lightBg,
          boxShadow: SHADOWS.card,
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: "center" }}
            >
              <Box sx={{ flex: 1, display: "flex", width: "100%" }}>
                <CompanyInput value={companyName} onChange={setCompanyName} />
              </Box>

              <Box sx={{ flex: 1, display: "flex", width: "100%" }}>
                <FileUploader
                  cvFile={cvFile}
                  onFileChange={handleFileChange}
                  inputMode={inputMode}
                  onInputModeChange={setInputMode}
                  manualText={manualText}
                  onManualTextChange={setManualText}
                />
              </Box>
            </Stack>

            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
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
              disabled={loading || !isFormValid}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Sparkles size={20} />
                )
              }
              fullWidth
              sx={{
                py: 1.2,
                fontWeight: 700,
                fontSize: "1.05rem",
                textTransform: "none",
                borderRadius: 2,
                background: GRADIENTS.mainButtonAnimated,
                backgroundSize: "200% auto",
                color: COLORS.lightBg,
                boxShadow: SHADOWS.btnGrad,
                transition: "0.5s ease",

                "&:hover": {
                  backgroundPosition: "right center",
                  boxShadow: SHADOWS.btnGradHover,
                },

                "&.Mui-disabled": {
                  background: COLORS.disabledBg,
                  color: COLORS.textMuted,
                  boxShadow: "none",
                  backgroundSize: "auto",
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

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
import { COLORS, GRADIENTS, SHADOWS } from "@/constants/theme";

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

  const [themeColor, setThemeColor] = useState("#608abf");

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
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              fullWidth
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: COLORS.asterisk || "#d32f2f",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
                  "& fieldset": {
                    borderColor: COLORS.border || "#cbd5e1",
                    borderWidth: "1.5px",
                  },
                  "&:hover fieldset": {
                    borderColor: COLORS.borderHover || "#94a3b8",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: COLORS.navy || "#1A2980",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
                  color: "text.secondary",
                  "&.Mui-focused": {
                    color: COLORS.navy || "#1A2980",
                  },
                },
              }}
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
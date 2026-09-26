"use client";

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
import { useApplicationForm } from "../hooks/useApplicationForm";
import FileUploader from "./FileUploader";
import AnalysisResult from "./AnalysisResult";
import AiLoader from "./AiLoader";

export default function ApplicationForm() {
  const {
    jobDescription,
    setJobDescription,
    cvFile,
    loading,
    error,
    result,
    handleFileChange,
    handleSubmit,
  } = useApplicationForm();

  return (
    <>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 4, maxWidth: 700, mx: "auto" }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              id="jobDescription"
              label="Job Description or Requirements"
              placeholder="Paste the full job description here (include the company name)..."
              multiline
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              fullWidth
            />

            <FileUploader cvFile={cvFile} onFileChange={handleFileChange} />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
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
              {loading ? "AI is working..." : "Analyze and Generate"}
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
          <AnalysisResult data={result} />
        </Box>
      )}
    </>
  );
}

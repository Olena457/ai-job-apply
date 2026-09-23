"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { Upload, FileText, Sparkles } from "lucide-react";

export default function ApplicationForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: I need to connect this to my NestJS backend later.
    // The API will trigger the LangGraph/LangChain flow to research the company,
    // calculate the match percentage, and generate the tailored CV PDF and Cover Letter.
    console.log("Submitting form data:", { jobDescription, cvFile });

    alert("Data submitted for processing");
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            id="jobDescription"
            label="Job Description, Company Name, or Link"
            placeholder="Paste the job description, requirements, and company info here..."
            multiline
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Your CV (PDF format)
            </Typography>

            <Button
              component="label"
              variant="outlined"
              startIcon={<Upload size={18} />}
              fullWidth
              sx={{
                py: 1.5,
                textTransform: "none",
                borderStyle: "dashed",
                borderWidth: 2,
              }}
            >
              {cvFile ? "Change File" : "Upload PDF File"}
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={handleFileChange}
                required={!cvFile}
              />
            </Button>

            {cvFile && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1.5,
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
                <FileText size={16} />
                <Typography variant="body2">{cvFile.name}</Typography>
              </Stack>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Sparkles size={20} />}
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold", textTransform: "none" }}
          >
            Analyze and Generate CV + Cover Letter
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

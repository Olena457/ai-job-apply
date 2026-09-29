"use client";

import { ChangeEvent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Upload, FileText } from "lucide-react";

interface FileUploaderProps {
  cvFile: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploader({
  cvFile,
  onFileChange,
}: FileUploaderProps) {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        Your Current CV (PDF format)
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
          onChange={onFileChange}
          required={!cvFile}
        />
      </Button>

      {cvFile && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 1.5, alignItems: "center", color: "text.secondary" }}
        >
          <FileText size={16} />
          <Typography variant="body2">{cvFile.name}</Typography>
        </Stack>
      )}
    </Box>
  );
}

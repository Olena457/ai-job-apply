
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
    <Box sx={{ textAlign: "left", width: "100%" }}>
      <Button
        component="label"
        variant="outlined"
        startIcon={<Upload size={18} />}
        fullWidth
        sx={{
          py: 1.5,
          px: 1, 
          textTransform: "none",
          borderStyle: "dashed",
          borderColor: cvFile ? "#1976d2" : "#cbd5e1",
          color:"#1976d2",
          borderWidth: 1.5,
          fontWeight: 600,
          fontSize: "clamp(0.7rem, 2.5vw, 0.675rem)",
          whiteSpace: "nowrap",
        }}
      >
        {cvFile ? (
          "Change File"
        ) : (
          <>
            Upload Your Current CV PDF File <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
          </>
        )}
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
          sx={{
            mt: 1.5,
            alignItems: "center",
            color: "text.secondary",
            minWidth: 0, 
          }}
        >
          <FileText size={16} style={{ flexShrink: 0 }} />
          <Typography
            variant="body2"
            noWrap 
            sx={{
              fontSize: "clamp(0.7rem, 2vw, 0.95rem)",
            }}
          >
            {cvFile.name}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
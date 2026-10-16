"use client";

import { ChangeEvent } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Download, FileText } from "lucide-react";
import { COLORS } from "@/constants/theme";

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
        startIcon={<Download size={18} style={{ color: COLORS.navy, flexShrink: 0 }} />}
        fullWidth
        sx={{
          py: 1.5,
          px: { xs: 0.5, sm: 1 }, 
          textTransform: "none",
          borderStyle: "dashed",
          borderColor: cvFile ? COLORS.navy : COLORS.border,
          color: COLORS.navy, 
          borderWidth: 2,
          fontWeight: 650,
          fontSize: "clamp(0.7rem, 2.2vw, 0.875rem)",
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "normal", 
          wordBreak: "break-word",
          "&:hover": {
            borderColor: COLORS.navy,
            bgcolor: "rgba(26, 41, 128, 0.04)",
          },
        }}
      >
        {cvFile ? (
          "Change File"
        ) : (
          <>
            Upload Your Current CV PDF File <span style={{ color: COLORS.asterisk, marginLeft: "2px" }}>*</span>
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
            color: COLORS.textMuted,
            minWidth: 0, 
          }}
        >
          <FileText size={16} style={{ flexShrink: 0, color: COLORS.navy }} />
          <Typography
            variant="body2"
            noWrap 
            sx={{
              fontSize: "0.85rem",
              color: COLORS.textPrimary,
            }}
          >
            {cvFile.name}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
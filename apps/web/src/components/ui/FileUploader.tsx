
"use client";

import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import { Download, FileText, Info } from "lucide-react";
import { COLORS } from "@/constants/theme";
import ProfileSourceDialog from "./ProfileSourceDialog"; 

interface FileUploaderProps {
  cvFile: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputMode: "pdf" | "text";
  onInputModeChange: (mode: "pdf" | "text") => void;
  manualText: string;
  onManualTextChange: (text: string) => void;
}

export default function FileUploader({
  cvFile,
  onFileChange,
  inputMode,
  onInputModeChange,
  manualText,
  onManualTextChange,
}: FileUploaderProps) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Box sx={{ textAlign: "left", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: "2px",
          mb: 1,
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: COLORS.navy,
              fontSize: "clamp(0.7rem, 2vw, 0.85rem)",
              whiteSpace: "nowrap",
            }}
          >
            Profile Source <span style={{ color: COLORS.asterisk }}>*</span>
          </Typography>
          <IconButton
            size="small"
            onClick={() => setInfoOpen(true)}
            sx={{ color: COLORS.navy, p: 0.5 }}
            aria-label="Profile source info"
          >
            <Info size={16} />
          </IconButton>
        </Box>

        <ToggleButtonGroup
          value={inputMode}
          exclusive
          onChange={(_, newMode) => newMode && onInputModeChange(newMode)}
          size="small"
          sx={{ height: 32 }}
        >
          <ToggleButton
            value="pdf"
            sx={{
              textTransform: "none",
              fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
              px: { xs: 0.8, sm: 1.2 },
              whiteSpace: "nowrap",
              "&.Mui-selected": {
                bgcolor: COLORS.disabledBg, 
                color: COLORS.navy, 
                "&:hover": {
                  bgcolor: COLORS.disabledBg, 
                },
              },
            }}
          >
            PDF Resume
          </ToggleButton>
          <ToggleButton
            value="text"
            sx={{
              textTransform: "none",
              fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
              px: { xs: 0.8, sm: 1.2 },
              whiteSpace: "nowrap",
              "&.Mui-selected": {
                bgcolor: COLORS.disabledBg,
                color: COLORS.navy,
                "&:hover": {
                  bgcolor: COLORS.disabledBg,
                },
              },
            }}
          >
            Type Skills
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {inputMode === "pdf" ? (
        <>
          <Button
            component="label"
            variant="outlined"
            startIcon={
              <Download
                size={18}
                style={{ color: COLORS.navy, flexShrink: 0 }}
              />
            }
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
              },
            }}
          >
            {cvFile ? "Change PDF File" : "Upload Your Current CV PDF File"}
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={onFileChange}
              required={inputMode === "pdf" && !cvFile}
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
              <FileText
                size={16}
                style={{ flexShrink: 0, color: COLORS.navy }}
              />
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
        </>
      ) : (
        <TextField
          multiline
          rows={2}
          fullWidth
          placeholder="Paste key skills, tech stack, or bio (e.g., React, Next.js, TypeScript...)"
          value={manualText}
          onChange={(e) => onManualTextChange(e.target.value)}
          sx={{
            bgcolor: "background.paper",
            "& .MuiOutlinedInput-root": {
              fontSize: "clamp(0.7rem, 2.1vw, 0.85rem)",
              borderRadius: 2,
            },
          }}
        />
      )}

      <ProfileSourceDialog open={infoOpen} onClose={() => setInfoOpen(false)} />
    </Box>
  );
}
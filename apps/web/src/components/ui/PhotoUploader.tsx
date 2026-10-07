
"use client";

import React, { useRef } from "react";
import { Box, Button, Avatar, Typography, IconButton } from "@mui/material";
import { Image as ImageIcon, X } from "lucide-react";
import { COLORS } from "@/constants/theme";

interface PhotoUploaderProps {
  photoData: string | null;
  error?: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}

export default function PhotoUploader({
  photoData,
  error,
  onUpload,
  onClear,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        border: `2px dashed ${error ? COLORS.asterisk : COLORS.border}`,
        borderRadius: 2,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        
        "&:hover": {
          borderColor: COLORS.navy,
          bgcolor: "rgba(26, 41, 128, 0.04)",
        },
      }}
    >
      <Avatar
        src={photoData || undefined}
        sx={{ width: 64, height: 64, bgcolor: "action.hover", flexShrink: 0 }}
      >
        {!photoData && (
          <ImageIcon
            size={28}
            color={error ? COLORS.asterisk : COLORS.textMuted}
          />
        )}
      </Avatar>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: COLORS.navy, 
            fontSize: "0.875rem",
            mb: 0.5,
            textAlign: "left",
            alignSelf: "flex-start",
          }}
        >
          Resume photo{" "}
          <Box
            component="span"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 400,
              color: COLORS.textMuted,
              ml: 0.5,
            }}
          >
            (jpg, jpeg, png)
          </Box>
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
            mt: 0.5,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              fontSize: "0.7rem",
              color: COLORS.navy,
              borderColor: COLORS.border,
              "&:hover": {
                borderColor: COLORS.navy,
                bgcolor: "rgba(26, 41, 128, 0.04)",
              },
            }}
          >
            {photoData ? "Change" : "Upload photo"}
          </Button>

          {photoData && (
            <IconButton
              size="small"
              color="error"
              onClick={onClear}
              title="Delete photo"
            >
              <X size={18} />
            </IconButton>
          )}
        </Box>

        {error && (
          <Typography
            variant="caption"
            color="error"
            sx={{ display: "block", mt: 0.5 }}
          >
            {error}
          </Typography>
        )}

        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
}